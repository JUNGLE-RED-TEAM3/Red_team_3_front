// VideoVanvas.js로 수정
import React, { useCallback, useEffect, useRef } from 'react';
import Webcam from 'react-webcam';

// import { css } from '@emotion/css';
import { css } from '@emotion/react';

import { Camera } from '@mediapipe/camera_utils';
import { Hands } from '@mediapipe/hands';
import { drawCanvas } from './drawCanvas';
import { AudioPlayer } from './song';

export const VideoCanvas = () => {
    const webcamRef = useRef(null)
    const canvasRef = useRef(null)
    const drawCanvasRef = useRef(null)
    const resultsRef = useRef(null)

    /**
     * 감지 결과 (매 프레임마다 호출됨)
     * @param results
     */
    const Results = useCallback((results) => {
        resultsRef.current = results
        const canvasCtx = canvasRef.current.getContext('2d')
        drawCanvas(canvasCtx, results)
    }, [])
    // 초기 설정

    useEffect(
        () => {
        const hands = new Hands({
            locateFile: file => {
                return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
            }
        })

        //1
        const ctx = drawCanvasRef.current.getContext('2d')
        const videoCtx = canvasRef.current.getContext('2d')
        //1.end

        hands.setOptions({
            maxNumHands: 1,
            modelComplexity: 1,
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.5
        })
        hands.onResults((Results) => {
                drawCanvas(ctx, videoCtx, Results)
        })
        if (webcamRef.current !== null) {
            const camera = new Camera(webcamRef.current.video, {
                onFrame: async () => {
                    await hands.send({ image: webcamRef.current.video })
                },
                width: 1280,
                height: 720,
            })
            camera.start()
        }
        const img1 = new Image();
        img1.src = '/1.png';
        img1.onload = () => {
            ctx.drawImage(img1, 0, 0, 1280,100);
        };
        const img2 = new Image();
        img2.src = '/d_alpha-retangle.png';
        img2.onload = () => {
            ctx.drawImage(img2, 50, 50, 1500, 1000);
        };
    }, [Results]
    )

    /** 감지 결과를 콘솔에 출력 */
    const OutputData = () => {
        const results = resultsRef.current
        console.log(results.multiHandLandmarks)
    }

    const videoConstraints = {
        width: 1280,
        height: 720,
        facingMode: 'user'
    }

    return (
        <div className={styles.container}>
            {/*NOTE: 캡처 */}
            <Webcam
                audio={false}
                style={{ visibility: 'hidden' }}
                width={1280}
                height={720}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                screenshotQuality={1}
                videoConstraints={videoConstraints}
            />
            {/*NOTE: 그리기 */}
            <canvas ref={canvasRef}
            className={styles.canvas}
            width={1280}
            height={720}
            />
            {/* 비디오 출력 캔버스 */}
            <canvas ref={drawCanvasRef}
            className={styles.canvas}
            width={1280}
            height={720}
            />
            {/*NOTE: 출력 */}
            <div className={styles.buttonContainer}>
                <button className={styles.button} onClick={OutputData}>
                    Output Data
                </button>
            </div>
            <AudioPlayer/>
        </div>
    )
}
// ==============================================
// styles
const styles = {
    container: css`
        position: relative;
        width: 100vw;
        height: 100vh;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
    `,
    canvas: css`
        position: absolute;
        width: 1280px;
        height: 720px;
        background-color: transparent;
    `,
    buttonContainer: css`
        position: absolute;
        top: 20px;
        left: 20px;
    `,
    button: css`
        color: #fff;
        background-color: #0082CF;
        font-size: 1rem;
        border: none;
        border-radius: 5px;
        padding: 10px 10px;
        cursor: pointer;
    `
}
export default VideoCanvas;