'use client'

import { useState } from 'react'

// UTM tracking helper
const addUtm = (url: string, source: string = 'tiktok', medium: string = 'linkinbio') => {
  const separator = url.includes('?') ? '&' : '?'
  return `${url}${separator}utm_source=${source}&utm_medium=${medium}&utm_campaign=bio_links`
}

const links = [
  {
    title: 'The Detox Blueprint',
    description: 'eBook • Audiobook • Print',
    url: 'https://www.amazon.com/dp/B0GL6XJ2J4',
    image: '/images/detox-blueprint.png',
  },
  {
    title: 'Ancient African Secrets to Great Health',
    description: 'eBook • Audiobook • Bundle',
    url: 'https://ancientafricansecrets.com/sale',
    image: '/images/ebook.png',
  },
  {
    title: 'Visit Our Website',
    description: 'ancientafricansecrets.com',
    url: 'https://ancientafricansecrets.com',
    image: null,
  },
]

export default function LinkInBio() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const trackClick = (linkName: string, url: string) => {
    console.log(`Link clicked: ${linkName}`)
    window.open(addUtm(url), '_blank')
  }

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()

      if (res.ok) {
        setStatus('success')
        setEmail('')
      } else {
        setStatus('error')
        setErrorMsg(data.error || 'Something went wrong')
      }
    } catch {
      setStatus('error')
      setErrorMsg('Connection error. Please try again.')
    }
  }

  return (
    <main className="min-h-screen py-8 px-4">
      <div className="max-w-md mx-auto">
        
        {/* Profile Section */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 mx-auto mb-4">
            <img 
              src="/images/logo.png" 
              alt="Ancient African Secrets" 
              className="w-full h-full rounded-full object-cover shadow-lg"
            />
          </div>
          
          <h1 className="text-2xl font-bold text-aas-charcoal mb-1">
            Ancient African Secrets
          </h1>
          
          <p className="text-aas-earth font-medium mb-3">
            Health Wisdom From The Ancients 🌿
          </p>
          
          <p className="text-gray-600 text-sm leading-relaxed max-w-xs mx-auto">
            Natural remedies passed down through generations. 
            No fads. No gimmicks. Just ancestral wisdom backed by modern science.
          </p>
        </div>

        {/* Planner Email Opt-in */}
        <div className="mb-6 bg-white rounded-2xl shadow-md border border-aas-gold/20 overflow-hidden">
          <div className="flex items-center gap-4 p-3 pb-0">
            <div className="w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden bg-gray-50">
              <img 
                src="/images/15-day-planner.png" 
                alt="15-Day Detox Planner"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="font-semibold text-aas-charcoal text-sm">📋 FREE: 15-Day Detox Planner</div>
              <div className="text-xs text-gray-500 mt-1">Your complete roadmap to reset your body</div>
            </div>
          </div>
          
          <div className="p-3 pt-3">
            {status === 'success' ? (
              <div className="text-center py-2 text-aas-forest font-medium text-sm">
                ✅ Check your email! Your planner is on the way.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 focus:border-aas-gold focus:outline-none focus:ring-2 focus:ring-aas-gold/20 text-sm"
                  required
                  disabled={status === 'loading'}
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="px-5 py-2.5 bg-aas-gold text-aas-charcoal font-semibold rounded-xl hover:bg-aas-gold-dark transition-colors disabled:opacity-50 text-sm"
                >
                  {status === 'loading' ? '...' : 'Get It Free'}
                </button>
              </form>
            )}
            {status === 'error' && (
              <p className="text-red-500 text-xs mt-2 text-center">{errorMsg}</p>
            )}
          </div>
        </div>

        {/* Product Links */}
        <div className="space-y-4 mb-8">
          {links.map((link, index) => (
            <a
              key={index}
              href={addUtm(link.url)}
              onClick={(e) => { e.preventDefault(); trackClick(link.title, link.url) }}
              className="block bg-white rounded-2xl shadow-md border border-gray-100 hover:shadow-lg hover:border-aas-gold/30 transition-all overflow-hidden"
            >
              {link.image ? (
                <div className="flex items-center gap-4 p-3">
                  <div className="w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden bg-gray-50">
                    <img 
                      src={link.image} 
                      alt={link.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-aas-charcoal text-sm">{link.title}</div>
                    <div className="text-xs text-gray-500 mt-1">{link.description}</div>
                  </div>
                  <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-3 p-4">
                  <span className="text-xl">🌍</span>
                  <div>
                    <div className="font-semibold text-aas-charcoal text-sm">{link.title}</div>
                    <div className="text-xs text-gray-500">{link.description}</div>
                  </div>
                  <svg className="w-5 h-5 text-gray-400 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              )}
            </a>
          ))}
        </div>

        {/* What You'll Discover */}
        <div className="mb-8">
          <h3 className="text-center font-bold text-aas-charcoal mb-4">What You'll Discover</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white rounded-xl p-3 text-center shadow-sm">
              <span className="text-2xl mb-1 block">🌿</span>
              <span className="text-xs text-gray-600">African Superfoods</span>
            </div>
            <div className="bg-white rounded-xl p-3 text-center shadow-sm">
              <span className="text-2xl mb-1 block">🫀</span>
              <span className="text-xs text-gray-600">Liver Support</span>
            </div>
            <div className="bg-white rounded-xl p-3 text-center shadow-sm">
              <span className="text-2xl mb-1 block">⚡</span>
              <span className="text-xs text-gray-600">Natural Energy</span>
            </div>
            <div className="bg-white rounded-xl p-3 text-center shadow-sm">
              <span className="text-2xl mb-1 block">🧘</span>
              <span className="text-xs text-gray-600">Mind Clarity</span>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center py-4 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-2">
            Your grandmother's wisdom, backed by science.
          </p>
          <a 
            href={addUtm('https://ancientafricansecrets.com')}
            className="text-aas-forest font-medium text-sm hover:underline"
          >
            ancientafricansecrets.com
          </a>
        </div>

        {/* Footer */}
        <footer className="text-center text-xs text-gray-400 mt-4">
          <p>© 2026 Ancient African Secrets</p>
          <p className="mt-1">
            <a href="https://ancientafricansecrets.com/privacy" className="hover:underline">Privacy</a>
            {' • '}
            <a href="https://ancientafricansecrets.com/terms" className="hover:underline">Terms</a>
          </p>
        </footer>

      </div>
    </main>
  )
}
