'use client'

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { UserTable } from "@/components/pages/dashboard/userTable"

export default function DashboardPage() {
    const router = useRouter();

    useEffect(() => {
        const accessToken = localStorage.getItem('token')
        if (!accessToken) {
            router.replace("/");
        }
    }, [])

    return (
        <div className="container mx-auto py-8">
            <UserTable />
        </div>
    )
}