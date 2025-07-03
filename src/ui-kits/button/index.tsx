import { cn } from "@/utils";
import { LeafIcon } from "lucide-react";
import React from "react";

interface UIButtonProps {
    title: React.ReactNode | string;
    className?: string;
    onClick?: (e:any) => void
    disabled?: boolean,
    type?: 'button' | 'submit' | 'reset'
}

const UIButton: React.FC<UIButtonProps> = ({
    title,
    className = "",
    onClick,
    disabled,
    type = "button",
    ...props
}) => {
    return (

        <button
            type={type}
            className={cn(`px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl`,disabled ? 'opacity-50':'opacity-100', className)}
            onClick={(e:any)=>{
                if(disabled)return
                onClick &&  onClick(e)}}
            disabled={disabled}
            {...props}
        >
            {title}
        </button>

    );
};

export default UIButton;
