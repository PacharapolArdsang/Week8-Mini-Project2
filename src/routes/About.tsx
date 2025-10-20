// Component สำหรับหน้า About (หน้าเกี่ยวกับ)
// เป็น Component แบบง่ายๆ ที่ไม่มี state หรือ logic ซับซ้อน
export default function About() {
  const technologies = [
    { name: "Vite", description: "Build Tool", icon: "⚡️" },
    { name: "React + TypeScript", description: "Framework", icon: "⚛️" },
    { name: "React Router DOM", description: "Routing", icon: "🗺️" },
    { name: "Redux Toolkit", description: "State Management", icon: "🔄" },
    { name: "TailwindCSS + daisyUI", description: "Styling", icon: "🎨" },
    { name: "Axios", description: "Data Fetching", icon: "🔗" },
  ];

  const members = [
    {
      name: "Pacharapol Ardsang",
      id: "1650700436",
      contributions: "Categories Function, API LINK, Vercel",
    },
    {
      name: "Chittaworn Pisidpitayakul",
      id: "1650707019",
      contributions: "Categories UI, CI",
    },
    {
      name: "Wasaphol Suphannarat",
      id: "1657070845",
      contributions: "UI Home/Card and News details",
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col gap-8">
        <div className="bg-base-100 p-6 rounded-lg shadow-2xl">
          <h1 className="text-4xl font-bold mb-2 text-center">
            เกี่ยวกับโปรเจกต์
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
          <p className="mb-6 text-center max-w-2xl mx-auto">
            โปรเจกต์นี้เป็นเว็บแอปพลิเคชันสำหรับติดตามข่าวสารล่าสุดจากทั่วโลก
            ดึงข้อมูลจาก <b>NewsAPI.org</b> 
            <br />
            และออกแบบเพื่อสาธิตการทำงานร่วมกันของเครื่องมือสมัยใหม่
            ได้แก่:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {technologies.map((tech, index) => (
              <div
                key={index}
                className="bg-base-100 p-4 rounded-lg text-center transition-transform transform hover:scale-105 shadow-2xl"
              >
                <h3 className="font-bold">{tech.name}</h3>
                <p className="text-sm opacity-70">{tech.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-base-100 p-6 rounded-lg shadow-2xl">
          <h2 className="text-4xl font-bold mb-4 text-center">
            สมาชิกผู้จัดทำ
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
          <br />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {members.map((member, index) => (
              <div
                key={index}
                className="bg-base-100 p-4 rounded-lg text-center transition-transform transform hover:scale-105 shadow-2xl"
              >
                <div className="avatar placeholder mb-4">
                  <div className="bg-neutral-focus text-neutral-content rounded-full w-24 h-1">
                  </div>
                </div>
                <h3 className="font-bold">{member.name}</h3>
                <p className="text-sm opacity-70">{member.id}</p>
                <p className="text-sm mt-2">{member.contributions}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
