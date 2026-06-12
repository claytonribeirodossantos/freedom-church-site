import AuroraBorealisShader from "@/components/ui/aurora-borealis-shader";

export default function DemoOne() {
  return (
    <div className="relative min-h-screen w-full bg-black overflow-hidden">
      <AuroraBorealisShader />
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4">
        <h1 className="text-6xl font-bold text-white tracking-tight mb-4">
          Aurora Borealis
        </h1>
        <p className="text-xl text-white/70">
          An Interactive WebGL Shader
        </p>
      </div>
    </div>
  );
}
