export function Prompt24Logo() {
  return (
    <div className="flex flex-col items-center gap-1">
      {/* Chat Bubble with 24 */}
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-white"
      >
        {/* Chat bubble outline */}
        <path
          d="M8 4C5.79 4 4 5.79 4 8V24C4 26.21 5.79 28 8 28H24L32 36V28H32C34.21 28 36 26.21 36 24V8C36 5.79 34.21 4 32 4H8Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Number 24 inside bubble */}
        <text
          x="20"
          y="19"
          textAnchor="middle"
          dominantBaseline="middle"
          className="fill-white text-xs font-bold"
          style={{ fontSize: "14px", fontWeight: "700" }}
        >
          24
        </text>
      </svg>
      
      {/* Prompt24 text */}
      <span className="text-sm font-bold text-white">Prompt24</span>
    </div>
  );
}
