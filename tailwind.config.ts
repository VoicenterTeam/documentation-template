import type { Config } from 'tailwindcss'

export default <Partial<Config>> {
    theme: {
        extend: {
            typography: (theme: any) => {
                return {
                    DEFAULT: {
                        css: {
                            'h1, h2, h3, h4': {
                                fontWeight: theme('fontWeight.bold'),
                                'scroll-margin-top': 'var(--scroll-mt)'
                            },
                        }
                    }
                }
            }
        }
    },
    plugins: [
        require('@tailwindcss/typography'),
    // ...
    ],
}
