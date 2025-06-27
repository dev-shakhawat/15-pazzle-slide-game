import React, { useState } from 'react'
import Congrats from '../components/Congratulation';

export default function Game({}) {

    const initialTiles = [...Array(15).keys()].map(n => n + 1).concat(null);
    const [tiles, setTiles] = useState(shuffleArray([...initialTiles]));

    function shuffleArray(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1)); 
          
          [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
      }

    const handleClickBox = (e ,index) => {

        if(isGameOver) return;

        const currentIndex = e.target.getAttribute('data-index');
        const currentTile = tiles[currentIndex];
        const nextIndex = Number(currentIndex) + 1;
        const prevIndex = Number(currentIndex) - 1;
        const topIndex = Number(currentIndex) + 4;
        const btmIndex = Number(currentIndex) - 4;
        const nextTile = tiles[nextIndex];
        const prevTile = tiles[prevIndex];
        const topTile = tiles[topIndex];
        const btmTile = tiles[btmIndex];

        if (nextTile === null ) {
            tiles[currentIndex] = null;
            tiles[nextIndex] = currentTile;
            setTiles([...tiles]);
        }
        if(prevTile === null) {
            tiles[currentIndex] = null;
            tiles[prevIndex] = currentTile;
            setTiles([...tiles]);
        }
        if(topTile === null) {
            tiles[currentIndex] = null;
            tiles[topIndex] = currentTile;
            setTiles([...tiles]);
        }
        if(btmTile === null) {
            tiles[currentIndex] = null;
            tiles[btmIndex] = currentTile;
            setTiles([...tiles]);
        }
    }

    // check if the game is over?
    const isGameOver = tiles.every((tile, index) => {
        if (index === 15) return tile === null;
        return tile === index + 1;
      });

      
      
    
  return (
    <div className='grid place-items-center h-screen   '>
        
        {/* game board */}
        <div className="">
        <div className="grid grid-cols-4 gap-2 p-5 border-2 border-gray-300 rounded-lg  ">
            {!isGameOver ?
            tiles.map((tile, index) => (
                <button onClick={(e) => handleClickBox(e ,index)} key={index} type='button' data-index={index} className={ `${tile === index+1 ? "border-green-500 text-green-500" : "border-gray-300 text-black "} cursor-pointer  p-4 border-2 font-bold rounded-lg flex items-center justify-center`}>
                    {tile}
                </button>
            ))
            :
            <Congrats onClick={() => setTiles(shuffleArray([...initialTiles]))} />
            }

        </div>
        {!isGameOver && 
            <button onClick={() => setTiles(shuffleArray([...initialTiles]))} className="border-gray-300 text-black cursor-pointer  py-1 border-2 font-bold rounded-lg flex items-center justify-center w-full  ">Reset</button>}
        </div>
    </div>
  )
}
