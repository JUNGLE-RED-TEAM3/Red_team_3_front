import cv2
import os
import numpy as np

# 이미지 불러오기
# JUNHO: 해당부분은 넣고 싶은 이미지를 우클릭하고 copypath를 하여 가져다 붙이면 됩니다.
img = cv2.imread(r'C:\Users\SAMSUNG\Desktop\A_maskingPRac\Red_team_3_front\client\flask-server\pictures\d_circle.png')

#이제부터 시작
hi = 3
# 이미지의 모양 확인 (높이, 넓이, 채널 수)
height, width, channel = img.shape

# 이미지가 3채널인 경우 4채널로 변경
if channel == 3:
    img = cv2.cvtColor(img, cv2.COLOR_BGR2BGRA)

# 흰색과 비슷한 색상 범위 정의 (BGR 형태)
lower = np.array([180, 180, 180, 255])  # 밝은 회색
upper = np.array([255, 255, 255, 255])  # 흰색

# 흰색과 비슷한 색상을 가진 픽셀 선택
mask = cv2.inRange(img, lower, upper)

# 선택된 픽셀을 투명하게 만들기
img[mask==255] = [0, 0, 0, 0]


# 이미지를 흑백으로 변환
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)


# Binary 이미지로 변환, 흰색과 검은색으로만 구성된 이미지 127보다 밝으면 흰색(225), 아니면 검은색(0)
_, binary_img = cv2.threshold(gray, 127, 255, cv2.THRESH_BINARY_INV)


# contour를 찾기, 
# cv2. RETR_EXTERNAL은 바깥쪽 contour만 찾는다., RETR_LIST는 모든 contour를 찾지만, 계층 구조 상관없이, Retr_tree는 모든 contour를 찾지만, 계층 구조 상관있게
# cv2.CHAIN_APPROX_NONE은 모든 contour 포인트를 저장하지만, cv2.CHAIN_APPROX_SIMPLE은 contour line을 그릴 수 있는 포인트만 저장한다.
contours, _ = cv2.findContours(binary_img, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)

# FIXME: 사각형의 contour를 잡기 위함
# x, y, w, h = cv2.boundingRect(contours[2])

# x_min = x
# x_max = x+w
# y_min = y
# y_max = y+h


# contour를 그리기, -1은 모든 contour를 그린다., 0이면 첫번째 객체만 그리는 것
cv2.drawContours(img, contours, 2, (0, 255, 0), 3)        #NOTE: 우산은 49

cv2.imshow('img',img)
cv2.waitKey(0)
cv2.destroyAllWindows()


# contour를 그리고 안쪽영역을 채운다.
filled_img = np.zeros_like(binary_img) # img와 같은 크기의 검은색 이미지를 만듭니다.
cv2.drawContours(filled_img, contours, 2, (0, 255, 0), cv2.FILLED) # 검은색 이미지에 흰색으로 채워진 contour를 그립니다. 

def on_event_inside_contour(event, x, y, flags, param):
    # print("Event: {}, Coordinates: ({}, {})".format(event, x, y)) JUNHO: 이벤트가 발생할 때마다 좌표를 출력합니다.
    if event == cv2.EVENT_LBUTTONDOWN:
        dist = cv2.pointPolygonTest(contours[2], (x, y), False)
        if dist >= 0:
        # if x> x_min and x<x_max and y>y_min and y<y_max:
            print('inside')
        else:
            print('outside')
cv2.namedWindow('img')
cv2.setMouseCallback('img', on_event_inside_contour)

while True:
    cv2.imshow('img', img)
    if cv2.waitKey(20) & 0xFF == 27:
        break
