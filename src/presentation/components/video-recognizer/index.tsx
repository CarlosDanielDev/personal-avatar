import { useState, useEffect, useRef } from 'react'
import path from 'path'
import * as faceapi from 'face-api.js'

function pathResolver(folderName: string) {
  return path.resolve(__dirname, folderName)
}

export const VideoRecognizer = () => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const photoRef = useRef<HTMLImageElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const [isCameraActive, setCameraActive] = useState(false)

  useEffect(() => {
    const start = async () => {
      const pathResolved = pathResolver('modules')

      await Promise.all([
        faceapi.nets.faceRecognitionNet.loadFromUri(pathResolved),
        faceapi.nets.faceLandmark68Net.loadFromUri(pathResolved),
        faceapi.nets.faceExpressionNet.loadFromUri(pathResolved),
        faceapi.nets.ageGenderNet.loadFromUri(pathResolved),
        faceapi.nets.ssdMobilenetv1.loadFromUri(pathResolved)
      ]);

      startCamera()
    };

    start()
  }, [])

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: {} })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.addEventListener('play', () => {
          setCameraActive(true)
          detectFaceInRealTime()
        });
      }
    } catch (error) {
      console.error('Error accessing camera', error)
    }
  };


  function loadLabeledImages() {
    const labels = ['Black Widow', 'Captain America', 'Captain Marvel', 'Hawkeye', 'Jim Rhodes', 'Thor', 'Tony Stark', 'Matheus Brito', 'Carlos Daniel']
    return Promise.all(
      labels.map(async label => {
        const descriptions = []
        for (let i = 1; i <= 2; i++) {
          const img = await faceapi.fetchImage(`./labeled_images/${label}/${i}.jpg`)
          const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()
          descriptions.push(detections.descriptor)
        }
        return new faceapi.LabeledFaceDescriptors(label, descriptions)
      })
    )
  }

  async function detectFaceInRealTime() {
    const labeledFaceDescriptors = await loadLabeledImages()

    const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6)

    const displaySize = { width: 200, height: 200 }

    faceapi.matchDimensions(videoRef.current, displaySize)

    const canvas = faceapi.createCanvasFromMedia(videoRef.current)

    if (canvasRef.current) {
      canvasRef.current.innerHTML = ''
      canvasRef.current.appendChild(canvas)
    }

    videoRef.current!.play()

    faceapi.detectAllFaces(videoRef.current)
      .withFaceLandmarks()
      .withFaceDescriptors()
      .withFaceExpressions()
      .withFaceDescriptors()
      .withAgeAndGender()
      .then(async (detections: any) => {

        const resizedDetections = faceapi.resizeResults(detections, displaySize)

        const results = resizedDetections.map((d: any) => {
          const FM = faceMatcher.findBestMatch(d.descriptor)

          return {
            expressions: d.expressions,
            age: d.age,
            gender: d.gender,
            genderProbability: d.genderProbability,
            label: FM.label
          }
        })

        results.forEach((result: any) => {
          console.log(result)
        })

        if (isCameraActive) {
          requestAnimationFrame(detectFaceInRealTime);
        }
      });
  }

  return (
    <div className='webrecognitor'>
      <video ref={videoRef} autoPlay muted></video>
      <canvas ref={canvasRef}></canvas>
      <img ref={photoRef} alt="Captured" />
      <div ref={containerRef}></div>
    </div>
  );
};
