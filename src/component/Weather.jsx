import React, { useEffect, useState } from 'react'
import search from '../assets/search.png'
import clear from '../assets/clear.png'
import cloud from '../assets/cloud.png'
import humidity from '../assets/humidity.png'
import snow from '../assets/snow.png'
import wind from '../assets/wind.png'
import drizzle from '../assets/drizzle.png'
import rain from '../assets/rain.png'
import axios from 'axios'
import { useRef } from 'react'
import { AiOutlineCloseCircle } from "react-icons/ai";
import { Flip, ToastContainer, toast } from 'react-toastify';

export const Weather = () => {
    
    const[weatherData ,setWeatherData]=useState(false);

    const [cityName,setCityName]=useState('chennai');

    const inputRef=useRef();

    const hide=useRef();

    const[msg,setMsg]=useState('');

    const allIcon={
        '01d':clear,
        '01n':clear,
        '02d':cloud,
        '02n':cloud,
        '03d':cloud,
        '03n':cloud,
        '04d':drizzle,
        '04n':drizzle,
        '9d':rain,
        '9n':rain,
        '10d':rain,
        '10n':rain,
        '13d':snow,
        '13n':snow,
    }

      const searchWeather =  (city)=>{

        if(city===''){
            toast.warning("Enter Location name")
            return;
        }
            axios.post(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`)
            .then((res)=>{
                toast.success("Location updated successfully") 
                const icon=allIcon[res.data.weather[0].icon] || clear;
                setWeatherData({
                    cityname:res.data.name,
                    humidity:res.data.main.humidity,
                    windSpeed:res.data.wind.speed,
                    temperture:Math.floor(res.data.main.temp),
                    icon:icon
                }
                )
            })
            .catch((error)=>{
                if(error.status===404){
                    toast.error("Data is not found")
                    return;
                }
                setWeatherData(false);
            })     
        }


        useEffect(()=>{
            searchWeather('chennai')
        },[])


        function handelClick(cityName){
            searchWeather(cityName)
            inputRef.current.value='' 
        }
   

  return (
    <div>
    <ToastContainer hideProgressBar={true} closeButton={false} toastStyle={{background:'#103783', color:'white', height:'50px', width:''}} position='top-center' autoClose={2000}/>

    <div className='relative mt-10'>

        <div className='h-full place-self-center p-[10px] lg:p-[40px] rounded-lg bg-gradient-to-r from-[#6378a6]  to-[#103783] flex flex-col items-center'>

            <div className="flex items-center gap-2 md:gap-4 ">
                <input ref={inputRef}  type="text" className="rounded-full p-1 border-none outline-none h-[50px] pl-[25px] text-[#626262] bg-[#ebfffc] text-[15px] md:text-xl" placeholder='Search' />
                <img src={search} alt="" onClick={()=>{handelClick(inputRef.current.value)}} className='w-10 md:w-15 p-2.5 rounded-full bg-[#ebfffc] cursor-pointer'/>
            </div>

            {
                weatherData?<>  
            <img src={weatherData.icon} alt="" className="w-36 md:w-[60%]" />
            <p className='text-5xl md:text-7xl my-8 text-white leading-7'>{weatherData.temperture}°c</p>
            <p className='text-white text-5xl '>{weatherData.cityname}</p>

            <div className="mt-10 flex justify-between w-full text-white">
                <div className="flex gap-3 items-start">
                    <img src={humidity} alt="" className='h-7 mt-[6px]' />
                    <div className="text-lg">
                    <p>{weatherData.humidity} %</p>
                    <span>Humidity</span>
                    </div>
                </div>

                <div className="flex gap-3 items-start">
                    <img src={wind} alt="" className='h-7 mt-[6px]' />
                    <div className='text-lg'>
                    <p>{weatherData.windSpeed} Km/h</p>
                    <span>Wind speed</span>
                    </div>
                </div>
                
            </div>
            <p className='mt-[30px] text-white text-mg '>Designed by <span className='font-bold'>Thison Rooban J</span></p>
            </>:<></>
            }
        </div>

        
    </div>

    </div>
  )
}
