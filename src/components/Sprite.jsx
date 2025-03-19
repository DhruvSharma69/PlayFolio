import React, { useState, useEffect, useRef } from 'react';

const Sprite = ({ src, frameCount, frameWidth, frameHeight, fps }) => {
  const [frameIndex, setFrameIndex] = useState(0);
  const canvasRef = useRef(null);

  useEffect(() => {
    console.log('use effect from Sprite component');
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const image = new Image();
    image.src = src;

    let animationFrameId;

    const animate = () => {
      // Clear the canvas
      ctx.clearRect(0, 0, frameWidth, frameHeight);

      // Draw the current frame
      ctx.drawImage(
        image,
        frameIndex * frameWidth, // Source X (frame position in sprite sheet)
        0, // Source Y
        frameWidth, // Frame width
        frameHeight, // Frame height
        0, // Destination X
        0, // Destination Y
        frameWidth, // Destination width
        frameHeight // Destination height
      );

      // Update frame index
      setFrameIndex((prev) => (prev + 1) % frameCount);

      // Request the next frame
      animationFrameId = requestAnimationFrame(animate);
    };

    // Start the animation when the image loads
    image.onload = () => {
       console.log('image onload called');
      canvas.width = frameWidth;
      canvas.height = frameHeight;
      animate();
    };

    // Clean up
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [src, frameCount, frameWidth, frameHeight, frameIndex]);

  return <canvas ref={canvasRef} />;
};

export default Sprite;