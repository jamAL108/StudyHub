import * as React from "react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from 'next/link'
import { FcGoogle } from "react-icons/fc";
import { Separator } from "@/components/ui/separator"

export default function CardWithForm() {
    return (
        <Card className="border-none w-[450px]">
            <CardHeader>
                <CardTitle className="text-2xl">Get Started</CardTitle>
                <CardDescription>Create a new account</CardDescription>
            </CardHeader>
            <CardContent className="mt-3">
                <div className="grid gap-4">
                    <Button variant="outline" className="w-full bg-accent hover:bg-accent/80 py-5">
                        <FcGoogle className="mr-4 h-[18px] w-[19px]" />
                        Login with Google
                    </Button>
                    <div className="flex justify-center items-center w-full gap-3">
                        <Separator className="w-[45%] my-3" />
                        <p>or</p>
                        <Separator className="w-[45%] my-3" />
                    </div>
                    <div className="grid gap-2 mt-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="m@example.com"
                            required
                            className="bg-accent/30"
                        />
                    </div>
                    <div className="grid gap-2 mt-1">
                        <div className="flex items-center">
                            <Label htmlFor="password">Password</Label>
                            <Link href="#" className="ml-auto inline-block text-xs underline">
                                Forgot your password?
                            </Link>
                        </div>
                        <Input id="password" type="password" placeholder="******" className="bg-accent/30" required />
                    </div>
                    <Button type="submit" className="w-full mt-8">
                        Sign in
                    </Button>
                </div>
                <div className="mt-10 text-center text-muted-foreground text-sm ">
                    Don&apos;t have an account?{" "}
                    <Link href="#" className="underline text-white">
                        Sign Up Now
                    </Link>
                </div>
                <div className="w-full text-muted-foreground text-xs text-center mt-12">
                    By continuing, you agree to StudyHub&apos;s  , 
                    <Link href="#" className="underline text-white">
                         Terms of Service
                    </Link> and  <Link href="#" className="underline text-white"> 
                        Privacy & Policy
                    </Link>, and to receive periodic emails with updates.
                </div>
            </CardContent>
        </Card>
    )
}
