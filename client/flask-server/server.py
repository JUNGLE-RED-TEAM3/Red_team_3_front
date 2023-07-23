import cv2
import time
import handtrackingmodule as htm
import numpy as np
import os
from flask import Flask, render_template, Response

app = Flask(__name__)


#배경 이미지(background_img) 위에 PNG 이미지(img_to_overlay)를 (x, y) 위치에 삽입합니다. 
# overlay_size는 PNG 이미지의 크기를 조절하는 데 사용됩니다. 이 함수는 배경 이미지와 PNG 이미지를 알파 블렌딩하여 합치는 작업을 수행합니다.
def overlay_transparent(background_img, img_to_overlay, x, y, overlay_size=None):
    bg_img = background_img.copy()
    # convert 3 channels to 4 channels
    if bg_img.shape[2] == 3:
        bg_img = cv2.cvtColor(bg_img, cv2.COLOR_BGR2BGRA)

    if overlay_size is not None:
        img_to_overlay = cv2.resize(img_to_overlay.copy(), overlay_size)

    b, g, r, a = cv2.split(img_to_overlay)

    mask = cv2.medianBlur(a, 5)

    h, w, _ = img_to_overlay.shape
    roi = bg_img[int(y-h/2):int(y+h/2), int(x-w/2):int(x+w/2)]

    img1_bg = cv2.bitwise_and(roi.copy(), roi.copy(), mask=cv2.bitwise_not(mask))
    img2_fg = cv2.bitwise_and(img_to_overlay, img_to_overlay, mask=mask)

    bg_img[int(y-h/2):int(y+h/2), int(x-w/2):int(x+w/2)] = cv2.add(img1_bg, img2_fg)

    # convert 4 channels to 4 channels
    bg_img = cv2.cvtColor(bg_img, cv2.COLOR_BGRA2BGR)

    return bg_img



@app.route('/')
def home():
    return render_template('index.html')

def get_frames():

    overlayList=[]#list to store all the images

    brushThickness = 25
    # JUNHO:
    brushTest = 200

    eraserThickness = 70
    drawColor=(255,0,255)#setting purple color

    xp, yp = 0, 0
    imgCanvas = np.zeros((720, 1280, 3), np.uint8)# defining canvas

    #images in header folder
    folderPath="Header"
    myList=os.listdir(folderPath)#getting all the images used in code
    #print(myList)
    for imPath in myList:#reading all the images from the folder
        image=cv2.imread(f'{folderPath}/{imPath}')
        overlayList.append(image)#pip inserting images one by one in the overlayList
    header=overlayList[0]#storing 1st image 
    cap=cv2.VideoCapture(0)

    # JUNHO: 3,4가 가로 세로 크기입니다.
    cap.set(3,1280)#width
    cap.set(4,720)#height

    detector = htm.handDetector(detectionCon=1, maxHands=1)#making object

    while True:

        # 1. Import image
        success, img = cap.read()

        # JUNHO:1이 좌우 반전이고, 다른 인수를 주면 또 달라질 수 있음.
        img=cv2.flip(img,1)#for neglecting mirror inversion
        temp_img = img.copy()
        
        # 2. Find Hand Landmarks
        img = detector.findHands(img)#using functions fo connecting landmarks
        lmList,bbox = detector.findPosition(img, draw=False)#using function to find specific landmark position,draw false means no circles on landmarks
        
        if len(lmList)!=0:
            # print(lmList)
            x1, y1 = lmList[8][1],lmList[8][2]# tip of index finger
            x2, y2 = lmList[12][1],lmList[12][2]# tip of middle finger
            
            
            # 3. Check which fingers are up
            fingers = detector.fingersUp()
            #print(fingers)

            # 4. If Selection Mode - Two finger are up
            if fingers[1] and fingers[2]:
                xp,yp=0,0
                #print("Selection Mode")
                #checking for click
                if y1 < 125:
                    if 150 < x1 < 210:#if i m clicking at purple brush
                        header = overlayList[0]
                        drawColor = (255, 0, 255)
                    elif 290 < x1 < 350:#if i m clicking at blue brush
                        header = overlayList[1]
                        drawColor = (255, 100, 0)
                    elif 410 < x1 < 480:#if i m clicking at green brush
                        header = overlayList[2]
                        drawColor = (0, 255, 0)
                    elif 510 < x1 < 600:#if i m clicking at eraser
                        header = overlayList[3]
                        drawColor = (0, 0, 0)
                # cv2.rectangle(img, (x1, y1 - 25), (x2, y2 + 25), drawColor, cv2.FILLED)#selection mode is represented as rectangle


            # 5. If Drawing Mode - Index finger is up
            if fingers[0] == False and fingers[1] and fingers[2] == False and fingers[3] == False and fingers[4] == False:
                cv2.circle(img, (x1, y1), 15, drawColor, cv2.FILLED)#drawing mode is represented as circle
                #print("Drawing Mode")
                if xp == 0 and yp == 0: #initially xp and yp will be at 0,0 so it will draw a line from 0,0 to whichever point our tip is at
                    xp, yp = x1, y1 # so to avoid that we set xp=x1 and yp=y1
                #till now we are creating our drawing but it gets removed as everytime our frames are updating so we have to define our canvas where we can draw and show also
                
                #eraser
                if drawColor == (0, 0, 0):
                    cv2.line(img, (xp, yp), (x1, y1), drawColor, eraserThickness)
                    cv2.line(imgCanvas, (xp, yp), (x1, y1), drawColor, eraserThickness)
                else:
                    cv2.line(img, (xp, yp), (x1, y1), drawColor, brushThickness)#gonna draw lines from previous coodinates to new positions 
                    cv2.line(imgCanvas, (xp, yp), (x1, y1), drawColor, brushThickness)
                xp,yp=x1,y1 # giving values to xp,yp everytime
            else:
                xp, yp = 0, 0
            
            #merging two windows into one imgcanvas and img
        
        # while문 안, if len(lmList)!=0 밖
        # 1 converting img to gray
        imgGray = cv2.cvtColor(imgCanvas, cv2.COLOR_BGR2GRAY)
        
        # 2 converting into binary image and thn inverting
        # 그림을 그린 부분은 검은색, 그렇지 않은 부분은 흰색으로 만듭니다.
        _, imgInv = cv2.threshold(imgGray, 50, 255, cv2.THRESH_BINARY_INV)#on canvas all the region in which we drew is black and where it is black it is cosidered as white,it will create a mask
        
        # 3 converting imgInv to BGR
        imgInv = cv2.cvtColor(imgInv,cv2.COLOR_GRAY2BGR)#converting again to gray bcoz we have to add in a RGB image i.e img
        
        # (1)-------------------------------------
        img_shape = img.shape # img shape를 확인합니다.
        img_dtype = img.dtype # img type을 확인합니다.
        # print(img_shape)

        imgInv = cv2.resize(imgInv, (img_shape[1], img_shape[0])) # img와 같은 크기로 변경합니다.
        imgInv = imgInv.astype(img_dtype) # img와 같은 타입으로 변경합니다.
        # -------------------------------------

        #add original img with imgInv ,by doing this we get our drawing only in black color
        # 손으로 그린 부분은 검은색이 되고, 배경은 캡처된 이미지가 된다.
        img = cv2.bitwise_and(img,imgInv)
        
        # (2)-------------------------------------
        img_shape = img.shape # img shape를 확인합니다.
        img_dtype = img.dtype # img type을 확인합니다.

        imgCanvas = cv2.resize(imgCanvas, (img_shape[1], img_shape[0])) # img와 같은 크기로 변경합니다.
        imgCanvas = imgCanvas.astype(img_dtype) # img와 같은 타입으로 변경합니다.
        # -------------------------------------

        # add img and imgcanvas,by doing this we get colors on img
        # 손으로 그린 부분을 채워준다.
        img = cv2.bitwise_or(img,imgCanvas)

        # setting the header image
        img[0:125,0:640]=header # on our frame we are setting our JPG image acc to H,W of jpg images

                # Setting the gmae igmage
        folderPath_gmae="pictures"
        myList2=os.listdir(folderPath_gmae)#getting all the images used in code
        # print(myList2)
        overlayList2=[]#list to store all the images
        for imPath in myList2:#reading all the images from the folder
            image=cv2.imread(f'{folderPath_gmae}/{imPath}', cv2.IMREAD_UNCHANGED)
            overlayList2.append(image) #inserting images one by one in the overlayList
        # print(len(overlayList2))

        # num_channels = overlayList2[6].shape[2]
        # print(num_channels)

        img = overlay_transparent(img, overlayList2[6], 960, 540, overlay_size=(800, 800))

        # img[90:270,230:410]=overlayList2[5]

        lmList1,bbox1 = detector.findPosition(temp_img, draw=False)
        if len(lmList1)!=0:
            xx, yy = lmList1[8][1],lmList1[8][2]# tip of index finger
            cv2.circle(img, (xx, yy), 12, (255,255,255), cv2.FILLED)#selection mode is represented as rectangle

        cv2.imshow("Image", img)
        # # cv2.imshow("Canvas", imgCanvas)
        # # cv2.imshow("Inv", imgInv)
        cv2.waitKey(1)

        # img를 JPEG로 인코딩합니다. 성공여부를 불리언값으로 리턴, 그리고 인코딩된 이미지(Numpy 배열)를 리턴합니다.
        ret, frame = cv2.imencode('.jpg', img)
        # 배열을 바이트형식으로 변환(http 응답시 필요)
        frame = frame.tobytes()

        

        # yield: 제너레이터 함수를 리턴합니다.
        # 각 부분은 --frame으로 시작하고, Content-Type 헤더를 포함하며, JPEG 이미지 데이터를 포함하고, 빈 줄로 끝남.
        # 이 모든 것이 raw bytes로 전송되어야 하므로, 바이트 리터럴을 사용하여 이를 표현합니다.
        yield (b'--frame\r\n'
                b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

# karina 웹캠 사이즈 = 360, 640
@app.route('/video_feed')
def video_feed():
    return Response(get_frames(), mimetype='multipart/x-mixed-replace; boundary=frame') # 각각의 비디오 프레임을 구분하기 위한 구분자로 "frame" 문자열을 사용하겠다는 것을 의미

if __name__ == '__main__':
    app.run(host='0.0.0.0',port=8000, debug=True)
