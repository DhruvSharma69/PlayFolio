import React from 'react'
import {useState, useEffect} from 'react'
import './Character.css'
import characterImgIdle from '../assets/Idle.png'
import characterImgRunning from '../assets/Run.png'
import Sprite from './Sprite'
function Character(){
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [characterState, setCharacterState] = useState({'state':'Idle'})
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
    
    <div
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
      }}
    >
      <Sprite
        src={characterState.state==='Idle'?characterImgIdle:characterImgRunning}
        frameCount={characterState.state==='Idle'?6:8} // Number of frames in the sprite sheet
        frameWidth={128} // Width of each frame
        frameHeight={128} // Height of each frame
        fps={1000} // Frames per second
      />
    </div>
  )
}

export default Character
