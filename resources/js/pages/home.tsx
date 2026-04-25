import { Link } from '@inertiajs/react'
import React from 'react'

export default function home() {
    return (
        <div>
            <h1>home</h1>
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
        </div>
    )
}
