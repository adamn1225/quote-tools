"use client";
import React from 'react';
import Link from 'next/link';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    TooltipProvider,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Bolt, Settings, Bot, FolderSearch2, Calculator, LucideTruck } from "lucide-react";

function Aside() {
    return (
        <TooltipProvider>
            <div className="pl-[200px] bg-gray-950 z-50">
                <aside className="inset-y fixed left-0 z-50 bg-gray-950 flex h-full flex-col border-r w-[260px]">
                    <div className="border-b p-2">
                        <Button aria-label="Home">
                            <Bolt className="size-8 bg-white text-white fill-foreground" />
                        </Button>
                    </div>
                    <nav className="grid gap-1 justify-center pt-8">
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link href="/equipment-directory">
                                    <Button
                                        variant="ghost"
                                        className="rounded-lg bg-muted flex items-center gap-2 bg-white"
                                        aria-label="Equipment Directory"
                                    >
                                        <FolderSearch2 className="size-5" />
                                        <span>Equipment Directory</span>
                                    </Button>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right" sideOffset={5}>
                                Equipment Directory
                            </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link href="/tools">
                                    <Button
                                        variant="ghost"
                                        className="rounded-lg flex items-center gap-2 bg-white"
                                        aria-label="Tools"
                                    >
                                        <Calculator className="size-5" />
                                        <span>Tools</span>
                                    </Button>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right" sideOffset={5}>
                                Tools
                            </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link href="/settings">
                                    <Button
                                        variant="ghost"
                                        className="rounded-lg flex items-center gap-2 bg-white"
                                        aria-label="Settings"
                                    >
                                        <Settings className="size-5" />
                                        <span>Settings</span>
                                    </Button>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right" sideOffset={5}>
                                Settings
                            </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link href="/help">
                                    <Button
                                        variant="ghost"
                                        className="rounded-lg bg-white flex items-center gap-2"
                                        aria-label="Help"
                                    >
                                        <Bot className="size-5" />
                                        <span>Help</span>
                                    </Button>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right" sideOffset={5}>
                                Help
                            </TooltipContent>
                        </Tooltip>
                    </nav>
                </aside>
            </div>
        </TooltipProvider>
    );
}

export default Aside;