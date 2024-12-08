import { CTA } from './cta'
import { GeminiFlowEffect } from './example'
import { Features } from './features'
import { Footer } from './footer'
import { Hero } from './test/Hero'
import { Navbar } from './navbar'
import { Pricing } from './pricing'

export const LandingPage = () => {
    // @Render
    return (
        <main>
            <Navbar />
            <Hero />
            <GeminiFlowEffect />
            <Features />
            <Pricing />
            <CTA />
            <Footer />
        </main>
    )
}
