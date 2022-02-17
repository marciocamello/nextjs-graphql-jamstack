import React from 'react'

export type HeroProps = {
    title: string;
    subtitle?: string;
    content?: string;
}

export default function Hero({ title, subtitle, content }: HeroProps) {
    return (
        <>
            <h1>{title}</h1>
            <h3>{subtitle}</h3>
            <p>{content}</p>
        </>
    )
}
