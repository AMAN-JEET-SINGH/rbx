import Image from "next/image";
import AdGoogle from "./components/AdGoogle";

const shineStyle = `
  @keyframes shine {
    0% {
      left: -100%;
    }
    100% {
      left: 100%;
    }
  }
  
  .shine-button::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    animation: shine 2s infinite;
    border-radius: inherit;
  }
`;

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center font-sans">
      <style>{shineStyle}</style>
      <main
        className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-3 px-5 sm:items-start bg-center bg-no-repeat overflow-hidden"
        style={{ backgroundImage: "url('/image/intro-bg.avif')", backgroundSize: 'cover', backgroundAttachment: 'cover' }}
      >
        <div className="flex flex-col items-center w-full relative">
          <AdGoogle slotId="8724045973" />
          <div className="flex items-center justify-center w-full overflow-hidden">
            <div className="w-full h-full overflow-hidden">
              <Image src="/image/intro.avif" alt="RBX Counter" width={1000} height={1000} className="w-full h-full object-cover" priority sizes="(max-width: 768px) 100vw, 1000px" />
            </div>
          </div>
          <a href="\home" className="shine-button relative z-10 -mt-8 px-12 py-2 text-white font-bold text-lg rounded-xl shadow-lg transition-colors duration-200 overflow-hidden" style={{ background: "linear-gradient(180deg, #FC9C10 0%, #FB7807 100%)" }}>
            TAP TO START
          </a>
          
          <div className="w-full mt-8 space-y-6 text-gray-200">
            <h1 className="text-3xl font-bold text-center">RBX Counter & Fun Rewards – Your Ultimate Robux Calculator!</h1>
            
            <p className="text-center">
              Count your daily free robux with our easy-to-use and powerful free robux counter, RBX calc and free robux converter.
            </p>
            
            <div>
              <h2 className="text-xl font-bold mb-3">Features</h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>RBX calculator</li>
                <li>Convert BC, TBC, and OBX to RBX instantly</li>
                <li>RBX to Dollar counter</li>
                <li>Spin & Win – Try your luck and win surprises!</li>
                <li>Quiz Time – Test your RB knowledge and earn points</li>
                <li>Lucky Scratch – Scratch & reveal exciting rewards.</li>
              </ul>
            </div>
            
            <div>
              <h2 className="text-xl font-bold mb-3">Important Information</h2>
              <p>
                RBLX Calc : Robox Counters is an unofficial application and is not affiliated with ROBLOX CORPORATION. It is designed to help players and fans discover free items and is fully compliant with Roblox's community usage guidelines.
              </p>
            </div>
            
            <div>
              <h2 className="text-xl font-bold mb-3">Refer to</h2>
              <p>
                The name, logo and information provided by the application used in accordance with the guidelines indicated in:{" "}
                <a 
                  href="https://en.help.roblox.com/hc/en-us/articles/115001708126-Roblox-Name-and-Logo-Community-Usage-Guidelines" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 underline"
                >
                  https://en.help.roblox.com/hc/en-us/articles/115001708126-Roblox-Name-and-Logo-Community-Usage-Guidelines
                </a>
              </p>
            </div>
            
            <p className="text-center font-semibold">Thank you!</p>
          </div>
        </div>
      </main>
  </div>
)
}
