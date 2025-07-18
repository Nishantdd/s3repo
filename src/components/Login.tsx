"use client";

import type React from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";

export default function Login() {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Login submitted");
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-center">
                        Welcome back
                    </CardTitle>
                    <CardDescription className="text-center">
                        Enter your credentials to access your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input
                            type="email"
                            placeholder="Username or email"
                            required
                            className="w-full"
                        />
                        <Input
                            type="password"
                            placeholder="Password"
                            required
                            className="w-full"
                        />
                        <Button
                            type="submit"
                            className="mt-5 w-full flex items-center justify-center"
                        >
                            <ArrowRight className="h-4 w-4" />
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
