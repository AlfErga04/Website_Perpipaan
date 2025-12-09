import { IoPersonCircleSharp } from "react-icons/io5";
import { TbShoppingCartHeart } from "react-icons/tb";
import { FaRepeat, FaRecycle } from "react-icons/fa6";

export const menuItems = [
	{
		label: "My Account",
		icon: IoPersonCircleSharp,
		iconSize: "w-8 h-8",
		padding: 3,
	},
	{
		label: "Wishlist",
		icon: TbShoppingCartHeart,
		iconSize: "w-8 h-8",
		padding: 3,
	},
	{
		label: "My Order",
		icon: FaRepeat,
		iconSize: "w-6 h-6",
		padding: 4,
	},
	{
		label: "Returns & Recycling",
		icon: FaRecycle,
		iconSize: "w-6 h-6",
		padding: 4,
	},
];
