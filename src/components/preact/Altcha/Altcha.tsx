import { useEffect, useRef, useState, useImperativeHandle } from 'preact/hooks';
import { forwardRef } from 'preact/compat';

interface AltchaProps {
    onStateChange?: (ev: Event | CustomEvent) => void;
}

const Altcha = forwardRef<{ value: string | null }, AltchaProps>(
    ({ onStateChange }, ref) => {
        const widgetRef = useRef<HTMLElement>(null);
        const [value, setValue] = useState<string | null>(null);

        useImperativeHandle(ref, () => {
            return {
                get value() {
                    return value;
                },
            };
        }, [value]);

        useEffect(() => {
            const handleStateChange = (ev: Event | CustomEvent) => {
                if ('detail' in ev) {
                    setValue(ev.detail.payload || null);
                    onStateChange?.(ev);
                }
            };

            const { current } = widgetRef;

            if (current) {
                current.addEventListener('statechange', handleStateChange);
                return () =>
                    current.removeEventListener(
                        'statechange',
                        handleStateChange
                    );
            }

            return () => { };
        }, [onStateChange]);

        const altcha = (
            //@ts-ignore
            <altcha-widget
                ref={widgetRef}
                challengeurl={`https://eu.altcha.org/api/v1/challenge?apiKey=${import.meta.env.PUBLIC_ALTCHA_API_KEY}`}
                style={{
                    '--altcha-max-width': '100%',
                }}
            >
                {/* @ts-ignore */}
            </altcha-widget>
        );

        return <div class="mt-5">{altcha}</div>;
    }
);

export default Altcha;
