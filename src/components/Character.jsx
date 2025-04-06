import React, { useState, useEffect } from 'react';
import { SpriteAnimator } from 'react-sprite-animator';
import characterImgIdle from '../assets/Idle.png';
import characterImgRunning from '../assets/Run.png';
import keyImage from '../assets/key.png';
function Character(){
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [characterState, setCharacterState] = useState({'state':'Idle'})
    const [facingRight, setFacingRight] = useState(true);
    const [keysCollected, setKeysCollected] = useState(0);
    const [keys, setKeys] = useState([
      { x: 200, y: 0, collected: false },
      { x: 500, y: 0, collected: false },
    ]);
    useEffect(() => {
      console.log('current pos x ',position.x,' y: ',position.y);
      const updatedKeys = keys.map((key) => {
        const isColliding = 
          !key.collected && 
          Math.abs(position.x - key.x) < 50 && 
          Math.abs(position.y - key.y) < 50;
        
        if (isColliding) {
          setKeysCollected(prev => prev + 1);
          return { ...key, collected: true };
        }
        return key;
      });
      setKeys(updatedKeys);
    }, [position]);

    const step = 10
    const xEdge = window.innerWidth - 50
    const yEdge = window.innerHeight - 50
    useEffect(() => {
        console.log('useEffect runs  pos: ',position.x,' ',position.y,' logged');
        const handleKeyDown = (e) => {
          switch (e.key) {
            case 'ArrowUp':
              setPosition((prev) => {
                    if(prev.y - 10 >= 0){
                        return ({ ...prev, y: prev.y - 10 })
                    }else{
                        //out of bound
                        return ({ ...prev, y: 0})
                    }
                
                });
                setCharacterState({'state': 'Running'});
              break;
            case 'ArrowDown':
                setPosition((prev) => {
                    if(prev.y + step <= yEdge){
                        return ({ ...prev, y: prev.y + step })
                    }else{
                        //out of bound
                        return ({ ...prev, y: yEdge})
                    }
                
                });
                setCharacterState({'state': 'Running'});
              break;
            case 'ArrowLeft':
                setFacingRight(false);
                setPosition((prev) => {
                    if(prev.x - step >= 0){
                        return ({ ...prev, x: prev.x - step })
                    }else{
                        //out of bound
                        return ({ ...prev, x: 0})
                    }
                
                });
                setCharacterState({'state': 'Running'});
                
              break;
            case 'ArrowRight':
                setPosition((prev) => {
                    if(prev.x + step <= xEdge){
                        return ({ ...prev, x: prev.x + step })
                    }else{
                        //out of bound
                        return ({ ...prev, x: xEdge})
                    }
                
                });
                setCharacterState({'state': 'Running'});
                setFacingRight(true);
              break;
            default:
              break;
          }
        };
        
        const handleKeyUp = ()=>{
          setCharacterState({'state': 'Idle'});
        }
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        return () =>{
           console.log('clean up function running ');
           window.removeEventListener('keydown', handleKeyDown)
           window.removeEventListener('keyup', handleKeyUp)
          };
      }, []);

      return (
        <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
          {/* Render keys */}
          {keys.map(
            (key, index) =>
              !key.collected && (
                <img
                  key={index}
                  src={keyImage}
                  style={{
                    position: 'absolute',
                    left: key.x,
                    top: key.y,
                    width: '30px',
                    height: '30px',
                  }}
                />
              )
          )}
    
          {/* Character */}
          <div style={{ position: 'absolute', left: position.x, top: position.y }}>
            <div style={{ transform: facingRight ? 'none' : 'scaleX(-1)' }}>
              <SpriteAnimator
                sprite={characterState.state === 'Idle' ? characterImgIdle : characterImgRunning}
                width={128}
                height={128}
                direction="horizontal"
                frameCount={characterState.state === 'Idle' ? 6 : 8}
                fps={8}
                shouldAnimate={true}
              />
            </div>
          </div>
    
          {/* Key counter UI */}
          <div style={{ position: 'absolute', top: '20px', left: '20px', color: 'red' }}>
            Keys: {keysCollected} / {keys.length}
          </div>
        </div>
      );
}

export default Character
