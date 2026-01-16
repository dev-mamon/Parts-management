import UserLayout from "@/Layouts/UserLayout";
import { Head, usePage } from "@inertiajs/react";
import { ArrowUpRight, FileText, Package } from "lucide-react";

export default function Dashboard() {
    const { auth } = usePage().props;

    const categories = [
        {
            title: "Aftermarket",
            img: "img/Dashboard/3c617ad5f59ffa440da98ed4041a9ae8434609ca.png",
            color: "bg-black",
        },
        {
            title: "Used Parts",
            img: "img/Dashboard/17d63dafa7370e189f5dffe98674e135091d04b8.png",
            color: "bg-[#F5B52E]",
        },
        {
            title: "Interior",
            img: "img/Dashboard/56b144518c1fddbb5095d6b2844d7c5de67f040d.png",
            color: "bg-[#B90000]",
        },
        {
            title: "All",
            img: "img/Dashboard/ee41bae3bee280556f5a00ec4188244fc4f406ed.png",
            color: "bg-black",
        },
    ];

    return (
        <UserLayout user={auth.user}>
            <Head title="Dashboard" />

            <div className="p-6 bg-[#F8F9FB] space-y-6">
                {/* 1. CATEGORY GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categories.map((cat, idx) => (
                        <div
                            key={idx}
                            className="bg-[#EBEBEB] rounded-[7px] p-8 flex flex-col items-center justify-between transition-all hover:shadow-lg border border-transparent hover:border-white group"
                        >
                            <div className="w-full h-48 flex items-center justify-center mb-6">
                                <img
                                    src={cat.img}
                                    alt={cat.title}
                                    className="max-w-full max-h-full object-contain drop-shadow-sm transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>

                            <button className="bg-black text-white w-full pl-8 pr-3 py-3 rounded-full flex items-center justify-between transition-all active:scale-95">
                                <span className="text-xl font-bold tracking-tight">
                                    Shop {cat.title}
                                </span>
                                <div className="bg-white/20 p-2.5 rounded-full border border-white/5">
                                    <ArrowUpRight className="w-5 h-5 text-white" />
                                </div>
                            </button>
                        </div>
                    ))}
                </div>

                {/* 2. PROMO & STATS */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* PROMO BANNER */}
                    <div className="lg:col-span-2 bg-[#D1D1D1] rounded-[7px] p-8 flex items-center justify-between overflow-hidden relative min-h-[300px]">
                        <div
                            className="absolute inset-0 opacity-5 pointer-events-none"
                            style={{
                                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='70' viewBox='0 0 80 92' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M40 0 L80 23 L80 69 L40 92 L0 69 L0 23 Z' fill='none' stroke='%23000' stroke-width='1.5'/%3E%3C/svg%3E")`,
                                backgroundSize: "60px 70px",
                                maskImage:
                                    "linear-gradient(to right, black 30%, transparent 90%)",
                                WebkitMaskImage:
                                    "linear-gradient(to right, black 30%, transparent 90%)",
                            }}
                        />

                        <div className="z-10 max-w-md">
                            <h2 className="text-[#F8F9FB] text-[2.8rem] font-black leading-[1] tracking-tighter mb-3">
                                Clearance Sell <br />
                                <span className="text-white/80">up to 70%</span>
                            </h2>
                            <p className="text-[#444] text-[1.1rem] mb-6 font-medium max-w-[300px] leading-snug">
                                Here's what's happening with your auto parts
                                orders today.
                            </p>

                            <button className="bg-[#B90000] text-white pr-2 py-2 rounded-full flex items-center gap-6 hover:brightness-110 transition-all shadow-xl group">
                                <span className="pl-6 text-lg font-black uppercase italic tracking-tighter">
                                    Buy Items
                                </span>
                                <div className="bg-white/20 p-2.5 rounded-full border border-white/10">
                                    <ArrowUpRight className="w-6 h-6 text-white" />
                                </div>
                            </button>
                        </div>

                        {/* Banner Image */}
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 h-full w-[45%] flex items-center justify-center">
                            <img
                                src="img/Dashboard/ee41bae3bee280556f5a00ec4188244fc4f406ed.png"
                                className="w-full h-auto object-contain drop-shadow-xl"
                                alt="Promo Banner"
                            />
                        </div>
                    </div>

                    {/* STATS COLUMN */}
                    <div className="flex flex-col gap-4">
                        <StatCard
                            icon={
                                <Package className="text-[#B90000] w-6 h-6" />
                            }
                            title="Active Orders"
                            value="12"
                        />
                        <StatCard
                            icon={
                                <FileText className="text-[#2563EB] w-6 h-6" />
                            }
                            title="Saved Quotes"
                            value="08"
                        />
                    </div>
                </div>
            </div>
        </UserLayout>
    );
}

/**
 * StatCard Component with fixed SVG background pattern
 */
function StatCard({ icon, title, value }) {
    // Encoded SVG string to ensure it renders as a background image
    const svgPattern = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='140' viewBox='0 0 220 140' fill='none'%3E%3Cpath opacity='0.2' d='M193.087 138.854C193.093 138.865 193.104 138.873 193.113 138.883C193.126 138.901 193.139 138.918 193.157 138.934C193.173 138.947 193.189 138.957 193.207 138.967C193.225 138.977 193.242 138.986 193.261 138.994C193.282 139.001 193.303 139.003 193.325 139.007C193.338 139.008 193.349 139.014 193.364 139.014H210.911C210.933 139.014 210.952 139.006 210.973 139.002C210.982 139 210.992 139 211.003 138.996C211.033 138.986 211.06 138.973 211.085 138.956C211.093 138.95 211.102 138.945 211.11 138.939C211.134 138.919 211.153 138.896 211.171 138.87C211.175 138.863 211.183 138.859 211.186 138.852L219.961 123.479C219.967 123.468 219.967 123.456 219.972 123.445C219.982 123.422 219.99 123.4 219.995 123.376C219.997 123.359 219.999 123.343 219.999 123.326C220 123.302 219.999 123.279 219.994 123.254C219.99 123.236 219.983 123.22 219.976 123.202C219.97 123.187 219.968 123.171 219.961 123.158L211.278 107.942L219.961 92.7295C219.967 92.7197 219.967 92.7075 219.972 92.6965C219.982 92.6733 219.991 92.6501 219.995 92.6256C219.996 92.6195 220 92.6134 220 92.6073C220.001 92.5963 219.997 92.5865 219.997 92.5756C219.997 92.5523 219.997 92.5291 219.993 92.5059C219.988 92.4839 219.979 92.4631 219.971 92.4424C219.966 92.4314 219.966 92.4204 219.96 92.4094L211.277 77.194L219.96 61.9812C219.966 61.9702 219.966 61.958 219.971 61.947C219.98 61.9238 219.989 61.9018 219.994 61.8773C219.995 61.8712 219.999 61.8651 219.999 61.8577C220 61.8468 219.996 61.837 219.996 61.826C219.996 61.8028 219.996 61.7796 219.991 61.7564C219.986 61.7331 219.978 61.7136 219.97 61.6916C219.965 61.6806 219.965 61.6696 219.959 61.6598L211.276 46.4445L219.959 31.2328C219.965 31.2218 219.965 31.2096 219.97 31.1986C219.979 31.1754 219.988 31.1534 219.993 31.129C219.994 31.1216 219.997 31.1155 219.997 31.1094C219.999 31.0984 219.995 31.0887 219.995 31.0789C219.995 31.0557 219.995 31.0337 219.99 31.0105C219.985 30.986 219.977 30.9653 219.967 30.9421C219.962 30.9323 219.962 30.9225 219.957 30.9127L211.274 15.6974L219.957 0.484519C219.979 0.445421 219.993 0.403893 219.997 0.361129C220.013 0.236503 219.955 0.110644 219.842 0.0434438C219.689 -0.0457491 219.496 0.00679932 219.408 0.160749L210.725 15.3761H193.359C193.346 15.3761 193.334 15.3822 193.32 15.3834C193.299 15.3858 193.277 15.3895 193.256 15.3968C193.237 15.4042 193.22 15.4127 193.202 15.4237C193.185 15.4335 193.168 15.4433 193.153 15.4567C193.136 15.4714 193.122 15.4897 193.108 15.508C193.101 15.5178 193.09 15.5251 193.082 15.5361L184.399 30.7478H167.033C167.02 30.7478 167.008 30.7539 166.995 30.7551C166.973 30.7576 166.951 30.7612 166.931 30.7686C166.912 30.7759 166.895 30.7844 166.876 30.7954C166.86 30.8052 166.843 30.815 166.827 30.8284C166.81 30.8431 166.797 30.8614 166.782 30.8797C166.775 30.8895 166.764 30.8968 166.758 30.9078L157.983 46.2844V46.2857C157.956 46.3345 157.941 46.3895 157.941 46.4445C157.941 46.4995 157.956 46.5557 157.983 46.6033V46.6046L166.665 61.8187L158.075 76.8727H140.898L132.215 61.6574C132.128 61.5034 131.933 61.4509 131.781 61.5401C131.68 61.5987 131.623 61.7075 131.623 61.8175V61.8187V61.8199C131.623 61.8749 131.636 61.9298 131.665 61.9799L140.347 77.194L131.757 92.2444H114.572L105.891 77.0328C105.885 77.0218 105.875 77.0145 105.867 77.0047C105.854 76.9864 105.84 76.9692 105.823 76.9533C105.807 76.9399 105.791 76.9301 105.773 76.9204C105.755 76.9106 105.738 76.9008 105.719 76.8935C105.698 76.8862 105.676 76.8837 105.655 76.8801C105.641 76.8788 105.631 76.8727 105.616 76.8727H88.0665C88.0533 76.8727 88.0412 76.8788 88.0279 76.8801C88.0062 76.8825 87.9844 76.8862 87.9639 76.8935C87.9446 76.9008 87.9277 76.9094 87.9095 76.9204C87.8926 76.9301 87.8757 76.9399 87.8601 76.9533C87.8431 76.968 87.8298 76.9864 87.8154 77.0047C87.8081 77.0145 87.7972 77.0218 87.7912 77.0328L79.1082 92.2444H61.7422C61.7289 92.2444 61.7169 92.2505 61.7036 92.2517C61.6818 92.2542 61.6601 92.2579 61.6396 92.2652C61.6203 92.2713 61.6033 92.2811 61.5864 92.2921C61.5695 92.3019 61.5526 92.3116 61.5369 92.3263C61.52 92.341 61.5067 92.3581 61.4922 92.3776C61.485 92.3874 61.4741 92.3947 61.4669 92.4057L52.7839 107.621H35.4179C35.4046 107.621 35.3925 107.627 35.3793 107.628C35.3575 107.631 35.3358 107.634 35.3152 107.642C35.2959 107.649 35.279 107.658 35.2609 107.669C35.244 107.678 35.2271 107.688 35.2114 107.702C35.1945 107.716 35.1812 107.735 35.1667 107.753C35.1595 107.763 35.1486 107.77 35.1425 107.781L26.4571 122.996L9.09357 122.998C9.08028 122.998 9.06822 123.004 9.05493 123.005C9.0332 123.007 9.01146 123.011 8.99094 123.018C8.9716 123.026 8.9547 123.034 8.93657 123.045C8.91966 123.055 8.90277 123.065 8.88707 123.078C8.87016 123.093 8.85687 123.111 8.84239 123.13C8.83514 123.139 8.82428 123.147 8.81703 123.158L0.0422363 138.531C0.0132599 138.582 -1.52588e-05 138.637 -1.52588e-05 138.691C-1.52588e-05 138.801 0.0567474 138.909 0.158188 138.968C0.310349 139.057 0.503571 139.005 0.591721 138.851L9.27472 123.639L26.4571 123.638L35.1413 138.853C35.1474 138.864 35.1582 138.872 35.1655 138.881C35.1788 138.9 35.1921 138.917 35.2102 138.933C35.2259 138.946 35.2416 138.956 35.2597 138.966C35.2778 138.975 35.2947 138.985 35.3141 138.992C35.3346 139 35.3563 139.002 35.378 139.006C35.3913 139.007 35.4022 139.013 35.4167 139.013H52.965C52.9868 139.013 53.0061 139.005 53.0266 139.001C53.0363 138.999 53.0459 138.999 53.0556 138.995C53.0858 138.985 53.1124 138.972 53.1377 138.955C53.1462 138.948 53.1546 138.944 53.1631 138.938C53.1873 138.918 53.2054 138.895 53.2235 138.868C53.2283 138.861 53.2355 138.857 53.2392 138.85L61.9222 123.638L79.1046 123.637L87.7876 138.852C87.7936 138.863 87.8045 138.87 87.8117 138.88C87.825 138.898 87.8383 138.916 87.8564 138.931C87.8721 138.945 87.8878 138.955 87.9059 138.964C87.9241 138.974 87.9409 138.984 87.9603 138.991C87.9808 138.999 88.0025 139.001 88.0243 139.005C88.0376 139.006 88.0484 139.012 88.0629 139.012H105.612C105.634 139.012 105.654 139.003 105.674 139C105.684 138.997 105.693 138.997 105.704 138.994C105.734 138.984 105.761 138.971 105.786 138.953C105.795 138.947 105.803 138.942 105.812 138.936C105.836 138.917 105.854 138.894 105.872 138.867C105.877 138.859 105.884 138.856 105.888 138.848L114.571 123.637L131.753 123.635L140.436 138.851C140.442 138.862 140.453 138.869 140.462 138.879C140.475 138.897 140.488 138.914 140.506 138.93C140.522 138.944 140.538 138.953 140.556 138.963C140.574 138.973 140.591 138.983 140.61 138.99C140.631 138.997 140.652 139 140.674 139.003C140.687 139.005 140.698 139.011 140.713 139.011H158.265C158.286 139.011 158.306 139.002 158.326 138.999C158.336 138.996 158.346 138.996 158.355 138.992C158.386 138.983 158.412 138.969 158.437 138.952C158.446 138.946 158.454 138.941 158.463 138.935C158.487 138.916 158.505 138.892 158.523 138.865C158.528 138.858 158.535 138.854 158.539 138.847L167.222 123.635L184.404 123.634L193.087 138.854ZM140.898 138.373L132.306 123.318L140.896 108.265H158.084L166.672 123.318L158.08 138.373H140.898ZM88.2513 138.373L79.6601 123.318L88.2501 108.265H105.437L114.026 123.318L105.434 138.373H88.2513ZM35.6051 138.373L27.0139 123.318L35.6039 108.265H52.7899L61.3799 123.318L52.7875 138.373H35.6051ZM219.319 123.318L210.726 138.373H193.545L184.954 123.318L193.543 108.265H210.73L219.319 123.318ZM53.337 107.941L61.9282 92.8883H79.1106L87.7006 107.942L79.1082 122.995L61.927 122.996L53.337 107.941ZM184.404 62.14L192.994 77.194L184.404 92.2444H167.219L158.629 77.1928L167.221 62.14H184.404ZM158.082 77.5166L166.671 92.567L158.081 107.621H140.898L132.308 92.567L140.896 77.5166H158.082ZM105.983 107.941L114.574 92.8883H131.758L140.348 107.942L131.756 122.995L114.574 122.996L105.983 107.941ZM158.631 107.941L167.222 92.8883H184.404L192.994 107.942L184.402 122.995L167.221 122.996L158.631 107.941ZM219.319 92.567L210.729 107.621H193.545L184.955 92.567L193.544 77.5166H210.731L219.319 92.567ZM219.319 61.8175L210.729 76.8715H193.545L184.955 61.8175L193.544 46.7671H210.73L219.319 61.8175ZM219.319 31.0679L210.729 46.122H193.545L184.955 31.0679L193.544 16.0175H210.73L219.319 31.0679ZM158.631 46.4433L167.222 31.3917L184.404 31.3905L192.994 46.4445L184.404 61.4949H167.219L158.631 46.4433ZM114.025 92.567L105.435 107.621H88.2513L79.6613 92.567L88.2501 77.5166H105.437L114.025 92.567Z' fill='black'/%3E%3C/svg%3E"`;

    return (
        <div className="bg-white p-6 rounded-[7px] shadow-sm flex flex-col justify-between relative group cursor-pointer border border-transparent hover:border-gray-100 transition-all flex-1 overflow-hidden">
            {/* Background SVG Pattern - Positioned at Bottom Right */}
            <div
                className="absolute bottom-[-10%] right-[-5%] w-48 h-48 opacity-[0.03] pointer-events-none transition-transform duration-700 group-hover:scale-110"
                style={{
                    backgroundImage: `url("${svgPattern}")`,
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    maskImage:
                        "linear-gradient(to top left, black 40%, transparent 95%)",
                    WebkitMaskImage:
                        "linear-gradient(to top left, black 40%, transparent 95%)",
                }}
            />

            <div className="flex justify-between items-center z-10">
                <div className="flex items-center gap-4">
                    <div className="p-4 bg-[#F8F9FB] rounded-2xl group-hover:bg-gray-100 transition-colors">
                        {icon}
                    </div>
                    <p className="text-[#475569] font-bold text-lg tracking-tight">
                        {title}
                    </p>
                </div>

                <div className="p-3 bg-[#F8F9FB] rounded-full group-hover:bg-black group-hover:text-white transition-all transform group-hover:rotate-45 shadow-sm">
                    <ArrowUpRight className="w-5 h-5" />
                </div>
            </div>

            <div className="mt-4 z-10">
                <h3 className="text-[2.5rem] font-black text-[#0F172A] tracking-tighter leading-none">
                    {value}
                </h3>
            </div>
        </div>
    );
}
