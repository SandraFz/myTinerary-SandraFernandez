import React, { useEffect, useState } from "react";
import Arrow from "../arrow/Arrow";
import './Carrusel.css'
import Data from '../../../public/assets/bd.json'

let left = {class:'left', leftUrl: './assets/images/arrow-left.png', leftAlt: 'Atrás'};
let right = {class: 'right', rightUrl: '../../../public/assets/images/arrow-right.png', rightAlt: 'Adelante'};


const Carrusel = () => {

    let imagesCarrusel4 = Data.events;

    const [index, setIndex] = useState(0)
    const [shortArray, setShortArray] = useState([]);
    
    useEffect(()=>{
          
    }, [])

    useEffect(()=>{
    
        switch(index){        
            case imagesCarrusel4.length-3:
                console.log(`Case 1; index:` + index)
                let images1 = []; 
                imagesCarrusel4.slice(index, index+3).map(
                    elem => { images1.push(elem)}) 
                images1.push(imagesCarrusel4[0])
                setShortArray(images1)
                break;

            case imagesCarrusel4.length-2:
                let images2 = [];
                console.log(`Case 2; index:` + index)
                imagesCarrusel4.slice(index, index+2).map(
                    elem => {
                    images2.push(elem)})
                imagesCarrusel4.slice(0, 2).map(
                        elem => {
                        images2.push(elem)})
                setShortArray(images2)
                break;

            case imagesCarrusel4.length-1:
                let images3 = []
                console.log(`Case 3; index:` + index)
                images3.push(imagesCarrusel4[imagesCarrusel4.length-1])
                imagesCarrusel4.slice(0, 3).map(elem => {
                    images3.push(elem)
                })
                setShortArray(images3)
                console.log(`Case 3; index:` + index)
            break;
            
            case imagesCarrusel4.length:
                let images4 = []
                images4 = imagesCarrusel4.slice(0, 4)
                setShortArray(images4)
                console.log(`Case 4; index:` + index)
                break;
            
            default:
                console.log(`Case default; index: ${index}`)
                let images = []
                if(index<Data.events.length-3){
                    imagesCarrusel4.slice(index, index+4).map(elem => {
                        images.push(elem)
                    })
                
                }else{
                    
                }
                setShortArray(images)
            break;
        }
        console.log(shortArray)
    
        let interval = setInterval(
            slideRight, 5000)

        return ()=>{clearInterval(interval)} 

    },[index])
    
    
    let slideLeft = () =>{
        //CORREGIR primeros slides
        switch(index-4){
            case -4:
                setIndex(imagesCarrusel4.length)
                break;
            case -3:
                setIndex(imagesCarrusel4.length-(1+0))
                break;
            case -2:
                setIndex(imagesCarrusel4.length-(1+1))    
                break;
            case -1:
                setIndex(imagesCarrusel4.length-(1+2))
                break;
            default:
                setIndex(index-4)
                break
        }
      
        console.log(index)
    }

    let slideRight = () =>{
        
            switch(index+4){
                case imagesCarrusel4.length+3:
                    setIndex(3)
                    break;
                case imagesCarrusel4.length+2:
                    setIndex(2)
                    break;
                case imagesCarrusel4.length+1:
                    setIndex(1)     
                    break;
                case imagesCarrusel4.length:
                    setIndex(0)
                    break;
                default:
                    setIndex(index+4)
                    break
            }
          
            //console.log(index)
   }

   /*let setBullet = ()=>{
    let array = []
    Array.of(shortArray.length/4).map((elem) =>{
            array.push(elem)
    })
}*/

/*
   const setBullet = (idBullet) => {
        setIndex(idBullet)
   }
*/
   /*let slideRight = () =>{
        (index + 4) > Data.events.length-1 ?setIndex(0):setIndex(index + 4)
        console.log(`slideRight después, index: ${index}`)
    }*/


    
    return (

        <div className="d-flex justify-center carrusel mb-3">

            <div className="left" onClick={slideLeft}>
                <Arrow  className={left.class} src={left.leftUrl} alt={left.leftAlt}/>
            </div>
            <div className="d-flex aligne-items-center flex-wrap containerImages">
                
                {//Corresponde al switch
                        shortArray.map((elem) =>{

                       return <div className="m-1">
                                <img className="carImg5" src={elem.image} alt="Turista" />
                            </div>
                            
                    })
                }
                
            </div>
            <div className="border border-2">
                {
                   [0,4,8].map(elem => { 
                        if(elem === index){
                            return <span>⚪</span>
                        }
                   })
                  
                }
            </div>
            <div className="right" onClick={slideRight}>
                <Arrow className={right.class} src={right.rightUrl} alt={right.rightAlt} />
            </div>
              
        </div>
    )
}

export default Carrusel
