import Footer from "../components/Footer";
import { IoPersonCircleOutline } from "react-icons/io5";
import { menuItems } from "../data/SidebarMenuData";
import NavBar from "../components/NavBar";

function ProfileOrder() {
	return (
		<>
			<NavBar />
			{/* Section */}
			<div className="w-full max-w-[110rem] mx-auto h-fit my-8 flex lg:flex-row flex-col gap-x-8">
				<div className="w-full lg:w-1/6 h-fit p-3 border border-neutral-300 rounded-md shadow-md bg-white">
					{/* Header Profile */}
					<div className="flex items-center gap-4 w-full lg:mx-auto">
						<IoPersonCircleOutline className="w-14 h-14" />
						<div className="text-lg font-medium">Hi, Mike Wazowski</div>
					</div>

					{/* Menu List */}
					<div className="mt-4">
						{menuItems.map((item, i) => (
							<div
								key={i}
								className={`flex items-center gap-2 pl-${item.padding} mt-2 p-2`}
							>
								<item.icon className={`${item.iconSize}`} />
								<div className="text-md font-light mt-0.5">{item.label}</div>
							</div>
						))}
					</div>
				</div>

				<div className="w-full lg:w-5/6 h-fit bg-blue-500 p-8">
					<div>aufhuehfu</div>
				</div>
			</div>
			<Footer />
		</>
	);
}

export default ProfileOrder;
