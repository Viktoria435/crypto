import { useEffect, useRef, useState } from "react";
import video1 from "../assets/media/1 to 3.webm";
import video2 from "../assets/media/1 to 2.webm";
import video3 from "../assets/media/2 to 1.webm";
import video4 from "../assets/media/3 to 1.webm";
import buttonAnimationBack from "../assets/media/red_button_animation.webm";
import buttonAnimationForward from "../assets/media/blue_button_animation.webm";
import buttonAnimationPlay from "../assets/media/play_button_animation.webm";
import backButton from "../assets/images/red_button.png";
import startButton from "../assets/images/play_button.png";
import forwardButton from "../assets/images/blue_button.png";
import MainScreen from "../assets/images/MainScreen.png";
import PlayScreen from "../assets/images/PlayScreen.png";
import ThirdScreen from "../assets/images/ThirdScreen.png";

const MainPage = () => {
   const videoRef = useRef<HTMLVideoElement | null>(null);
   const animationRef = useRef<HTMLVideoElement | null>(null);
   const [currentView, setCurrentView] = useState<
      "default" | "StartGameScreen" | "ThirdScreen"
   >("default");
   const [backgroundImage, setBackgroundImage] = useState<string>(MainScreen);
   const [buttonsVisible, setButtonsVisible] = useState(true);

   useEffect(() => {
      [MainScreen, PlayScreen, ThirdScreen].forEach((src) => {
         const img = new Image();
         img.src = src;
      });
   }, []);

   const playVideoWithAnimation = (
      videoSrc: string,
      nextView: "default" | "StartGameScreen" | "ThirdScreen",
      nextImage: string,
      animationSrc: string,
      animationStyle: string
   ) => {
      if (animationRef.current) {
         animationRef.current.src = animationSrc;
         animationRef.current.className = animationStyle;
         animationRef.current.classList.remove("hidden");

         const handleCanPlay = () => {
            setButtonsVisible(false);
            animationRef.current?.play().catch((err) => {
               console.error("Ошибка при воспроизведении анимации:", err);
            });
         };

         animationRef.current.addEventListener("canplay", handleCanPlay);

         animationRef.current.onended = () => {
            if (animationRef.current) {
               animationRef.current.classList.add("hidden");
            }
            playVideo(videoSrc, nextView, nextImage);

            animationRef.current?.removeEventListener("canplay", handleCanPlay);
         };
      }
   };

   const playVideo = (
      videoSrc: string,
      nextView: "default" | "StartGameScreen" | "ThirdScreen",
      nextImage: string
   ) => {
      if (videoRef.current) {
         setButtonsVisible(false);
         setBackgroundImage(MainScreen);
         videoRef.current.src = videoSrc;
         videoRef.current.load();
         videoRef.current.classList.remove("hidden");
         videoRef.current
            .play()
            .catch((err) =>
               console.error("Ошибка при воспроизведении видео:", err)
            );
         videoRef.current.onended = () => {
            setBackgroundImage(nextImage);
            setTimeout(() => {
               setCurrentView(nextView);
               setButtonsVisible(true);
            }, 200);
         };
      }
   };

   const videoStyles = "absolute top-0 left-0 w-full h-full object-cover z-10";
   const animationStyleBack =
      "absolute left-0 bottom-0 w-60 h-60 object-cover z-10 hidden bg-transparent";
   const animationStylePlay =
      "absolute left-1/2 transform -translate-x-1/2 bottom-0 w-60 h-60 object-cover overflow-hidden z-10 hidden bg-transparent";
   const animationStyleForward =
      "absolute right-0 bottom-0 w-60 h-60 object-cover overflow-hidden z-10 hidden bg-transparent";

   if (currentView === "StartGameScreen") {
      return (
         <div
            className="w-screen h-screen bg-cover bg-center flex justify-center items-center"
            style={{ backgroundImage: `url(${PlayScreen})` }}
         >
            {buttonsVisible && (
               <div className="w-full pl-12 gap-4 z-20 animate-fade-in">
                  <button
                     onClick={() =>
                        playVideoWithAnimation(
                           video3,
                           "default",
                           MainScreen,
                           buttonAnimationBack,
                           animationStyleBack
                        )
                     }
                     className="absolute left-0 transform bottom-0 w-60 h-60 object-contain z-20"
                  >
                     <img src={backButton} alt="button" />
                  </button>
                  <button
                     onClick={() =>
                        playVideoWithAnimation(
                           video3,
                           "default",
                           MainScreen,
                           buttonAnimationPlay,
                           animationStylePlay
                        )
                     }
                     className="absolute left-1/2 transform -translate-x-1/2 bottom-0 w-60 h-60 object-contain z-20"
                  >
                     <img src={startButton} alt="button" />
                  </button>
               </div>
            )}
            <video ref={videoRef} muted className={videoStyles} />
            <video ref={animationRef} muted />
         </div>
      );
   }

   if (currentView === "ThirdScreen") {
      return (
         <div
            className="w-screen h-screen bg-cover bg-center flex justify-center items-center"
            style={{ backgroundImage: `url(${ThirdScreen})` }}
         >
            {buttonsVisible && (
               <div className="w-full pl-12 gap-4 z-20 animate-fade-in">
                  <button
                     onClick={() =>
                        playVideoWithAnimation(
                           video4,
                           "default",
                           MainScreen,
                           buttonAnimationForward,
                           animationStyleForward
                        )
                     }
                     className="absolute right-0 transform bottom-0 w-60 h-60 object-contain z-20"
                  >
                     <img src={forwardButton} alt="button" />
                  </button>
               </div>
            )}
            <video ref={videoRef} muted className={videoStyles} />
            <video ref={animationRef} muted />
         </div>
      );
   }

   return (
      <div
         className="w-screen h-screen bg-cover bg-center flex justify-center items-center"
         style={{ backgroundImage: `url(${backgroundImage})` }}
      >
         {buttonsVisible && (
            <div className="w-full pl-12 gap-4 z-20 animate-fade-in">
               <button
                  onClick={() =>
                     playVideoWithAnimation(
                        video1,
                        "ThirdScreen",
                        ThirdScreen,
                        buttonAnimationBack,
                        animationStyleBack
                     )
                  }
                  className="absolute left-0 transform bottom-0 w-60 h-60 object-contain z-20"
               >
                  <img src={backButton} alt="button" />
               </button>
               <button
                  onClick={() =>
                     playVideoWithAnimation(
                        video2,
                        "StartGameScreen",
                        PlayScreen,
                        buttonAnimationForward,
                        animationStyleForward
                     )
                  }
                  className="absolute right-0 transform bottom-0 w-60 h-60 object-contain z-20"
               >
                  <img src={forwardButton} alt="button" />
               </button>
            </div>
         )}

         <video ref={videoRef} muted className={videoStyles} />
         <video ref={animationRef} muted />
      </div>
   );
};

export default MainPage;
