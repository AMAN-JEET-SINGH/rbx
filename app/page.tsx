import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center font-sans">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-3 px-5 sm:items-start">
        <div className="flex flex-col items-center w-full">
          <div className="flex items-center justify-center w-full">
            <div className="w-full h-full">
              <a href="\home">
                <Image src="/starting.webp" alt="RBX Counter" width={1000} height={1000} className="w-full h-full object-cover" />
              </a>
            </div>
          </div>
          
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
