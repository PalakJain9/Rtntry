"use client"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import '../app/globals.css'

export default function DropdownMenuDemo() {
  return (
    <DropdownMenu>
        <DropdownMenuTrigger className="text-xl button">
            &#9776;
        </DropdownMenuTrigger>
        <DropdownMenuContent
            className="bg-transparent backdrop-blur-sm button z-3 flex flex-col gap-[1rem] justiy-start items-start"
        >
            <Link 
                href="/#blog"
                className="w-full"
            ><DropdownMenuItem>
                BLOGS
            </DropdownMenuItem></Link>
            <Link
                href="#pinterest"
                className="w-full"
            > 
            <DropdownMenuItem>
                
                    
                    PINTEREST
                
            </DropdownMenuItem></Link>
            <Link
                href="/about"
                className="w-full"
            > 
                <DropdownMenuItem>
                    ABOUT US
            </DropdownMenuItem></Link>
        </DropdownMenuContent>
    </DropdownMenu>
  )
}
