import { useEffect, useRef, useState } from "react";
import buttonAnimationBack from "../assets/media/red_button_animation.webm";
import buttonAnimationForward from "../assets/media/blue_button_animation.webm";
import buttonAnimationPlay from "../assets/media/play_button_animation.webm";
import MainScreen from "../assets/images/Main_Screen.png";
import PlayScreen from "../assets/images/PlayScreen.png";
import ThirdScreen from "../assets/images/ThirdScreen.png";
import Dex from "../assets/images/dexScreener.png";
import Twitter from "../assets/images/twitter.png";
import Discord from "../assets/images/discord.png";

const MainPage = () => {
   const animationRefBack = useRef<HTMLVideoElement | null>(null);
   const animationRef = useRef<HTMLVideoElement | null>(null);
   const [currentView, setCurrentView] = useState<
      "default" | "StartGameScreen" | "ThirdScreen"
   >("default");
   const [backgroundImage, setBackgroundImage] = useState<string>(MainScreen);
   const [isTransitioning, setIsTransitioning] = useState(false);

   useEffect(() => {
      [MainScreen, PlayScreen, ThirdScreen].forEach((src) => {
         const img = new Image();
         img.src = src;
      });
   }, []);

   const changeBackgroundWithFade = (
      nextImage: string,
      nextView: "default" | "StartGameScreen" | "ThirdScreen"
   ) => {
      setIsTransitioning(true);
      setTimeout(() => {
         setBackgroundImage(nextImage);
         setCurrentView(nextView);

         setTimeout(() => {
            setIsTransitioning(false);
         }, 100);
      }, 650);
   };

   const handleVideoPlay = (videoRef: React.RefObject<HTMLVideoElement>) => {
      if (videoRef.current) {
         videoRef.current.play();
      }
   };

   return (
      <div
         className={`w-screen h-screen bg-cover bg-center flex justify-center items-center transition-opacity duration-900 overflow-hidden ${
            isTransitioning ? "opacity-0" : "opacity-100"
         }`}
         style={{
            backgroundImage: `url(${
               currentView === "StartGameScreen"
                  ? PlayScreen
                  : currentView === "ThirdScreen"
                  ? ThirdScreen
                  : backgroundImage
            })`,
         }}
      >
         <div className="w-full pl-12 gap-4 z-20 animate-fade-in">
            {currentView === "StartGameScreen" && (
               <>
                  <button
                     onClick={() =>
                        changeBackgroundWithFade(MainScreen, "default")
                     }
                     className="btn-style left-0 transform bottom-0"
                     onMouseDown={() => handleVideoPlay(animationRefBack)}
                  >
                     <video
                        ref={animationRefBack}
                        src={buttonAnimationBack}
                        muted
                        className="w-full h-full object-contain"
                        style={{ cursor: "pointer" }}
                     />
                  </button>
                  <button
                     onClick={() =>
                        changeBackgroundWithFade(MainScreen, "default")
                     }
                     className="btn-style left-1/2 transform -translate-x-1/2 bottom-0"
                     onMouseDown={() => handleVideoPlay(animationRef)}
                  >
                     <video
                        ref={animationRef}
                        src={buttonAnimationPlay}
                        muted
                        className="w-full h-full object-contain"
                        style={{ cursor: "pointer" }}
                     />
                  </button>
               </>
            )}
            {currentView === "ThirdScreen" && (
               <button
                  onClick={() =>
                     changeBackgroundWithFade(MainScreen, "default")
                  }
                  className="btn-style right-0 transform bottom-0"
                  onMouseDown={() => handleVideoPlay(animationRef)}
               >
                  <video
                     ref={animationRef}
                     src={buttonAnimationForward}
                     muted
                     className="w-full h-full object-contain"
                     style={{ cursor: "pointer" }}
                  />
               </button>
            )}
            {currentView === "default" && (
               <>
                  <button
                     onClick={() =>
                        changeBackgroundWithFade(ThirdScreen, "ThirdScreen")
                     }
                     className="btn-style left-0 transform bottom-0"
                     onMouseDown={() => handleVideoPlay(animationRefBack)}
                  >
                     <video
                        ref={animationRefBack}
                        src={buttonAnimationBack}
                        muted
                        className="w-full h-full object-contain"
                        style={{ cursor: "pointer" }}
                     />
                  </button>
                  <div className="absolute flex gap-x-2 left-1/2 transform -translate-x-1/2 bottom-5">
                     <a
                        href="#"
                        className="link-style"
                     >
                        <img
                           className="w-full h-full object-contain"
                           src={Dex}
                           alt="Dex Logo"
                        />
                     </a>
                     <a
                        href="https://discord.gg/Xppzaw4K"
                        className="link-style"
                     >
                        <img
                           className="w-full h-full object-contain"
                           src={Discord}
                           alt="Dex Logo"
                        />
                     </a>
                     <a
                        href="https://x.com/Bundy_Sol"
                        className="link-style"
                     >
                        <img
                           className="w-full h-full object-contain"
                           src={Twitter}
                           alt="Dex Logo"
                        />
                     </a>
                  </div>
                  <button
                     onClick={() =>
                        changeBackgroundWithFade(PlayScreen, "StartGameScreen")
                     }
                     className="btn-style right-0 transform bottom-0"
                     onMouseDown={() => handleVideoPlay(animationRef)}
                  >
                     <video
                        ref={animationRef}
                        src={buttonAnimationForward}
                        muted
                        className="w-full h-full object-contain"
                        style={{ cursor: "pointer" }}
                     />
                  </button>
               </>
            )}
         </div>
         <video ref={animationRef} muted />
      </div>
   );
};

export default MainPage;
