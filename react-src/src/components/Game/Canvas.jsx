import React, { useState, useEffect, useRef, useCallback } from 'react';
import { throttle } from 'lodash';

import socket from './Socket';

const Canvas = (props) => {
  let whiteboard = useRef();
  let isDrawing = false;
  let previous = {
    color: '#0000FF',
    x: 0,
    y: 0,
  };

  const drawLine = (x0, x1, y0, y1, color, emit) => {
    const context = whiteboard.current.getContext('2d');
    context.beginPath();
    context.moveTo(x0, y0);
    context.lineTo(x1, y1);
    context.strokeStyle = color;
    context.lineWidth = 2;
    context.stroke();
    context.closePath();

    if (!emit) {
      return;
    }
    var w = whiteboard.current.width;
    var h = whiteboard.current.height;

    console.log('emitting');

    socket.emit('drawing', {
      x0: x0 / w,
      x1: x1 / w,
      y0: y0 / h,
      y1: y1 / h,
      color: color,
    });
  };

  const onMouseDown = (clientX, clientY) => {
    isDrawing = true;
    previous.x = clientX;
    previous.y = clientY;
  };

  const onMouseUp = (clientX, clientY) => {
    if (!isDrawing) return;
    isDrawing = false;
    drawLine(previous.x, clientX, previous.y, clientY, previous.color, true);
  };

  const onMouseMove = throttle((clientX, clientY) => {
    if (!isDrawing) return;

    drawLine(previous.x, clientX, previous.y, clientY, previous.color, true);
    previous.x = clientX;
    previous.y = clientY;
  }, 10);

  useEffect(() => {
    function handleResize() {
      console.log('Resize!');
    }

    const onDrawingEvent = (data) => {
      const context = whiteboard.current.getContext('2d');

      var width = whiteboard.current.width;
      var height = whiteboard.current.height;
      context.beginPath();
      context.moveTo(data.x0 * width, data.y0 * height);
      context.lineTo(data.x1 * width, data.y1 * height);
      context.strokeStyle = data.color;
      context.lineWidth = 2;
      context.stroke();
      context.closePath();
    };

    window.addEventListener('resize', handleResize);

    socket.on('drawing', onDrawingEvent);
  }, []);

  return (
    <canvas
      // We use the ref attribute to get direct access to the canvas element.
      ref={whiteboard}
      onMouseDown={({ clientX, clientY }) => onMouseDown(clientX, clientY)}
      onMouseUp={({ clientX, clientY }) => onMouseUp(clientX, clientY)}
      onMouseEnter=''
      onMouseLeave=''
      onMouseMove={({ clientX, clientY }) => onMouseMove(clientX, clientY)}
      onTouchStart={({ clientX, clientY }) => onMouseDown(clientX, clientY)}
      onTouchEnd={({ clientX, clientY }) => onMouseUp(clientX, clientY)}
      onTouchCancel={({ clientX, clientY }) => onMouseUp(clientX, clientY)}
      onTouchMove={({ clientX, clientY }) => onMouseMove(clientX, clientY)}
      width='500px'
      height='500px'
      style={{ border: '1px solid #000000' }}
    />
  );
};

export default Canvas;
