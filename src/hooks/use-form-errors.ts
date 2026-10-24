import { useState } from 'react';

/**
 * Form hatalarını ne zaman göstereceğimizi yönetir:
 * kullanıcı alandan çıkınca (touch) ya da "Devam"a basınca (submit).
 * Yazarken her harfte kırmızı uyarı çıkmaz.
 */
export function useFormErrors<K extends string>(errors: Record<K, string | null>) {
  const [tried, setTried] = useState(false);
  const [touched, setTouched] = useState<Partial<Record<K, boolean>>>({});

  const valid = (Object.values(errors) as (string | null)[]).every((e) => !e);

  return {
    valid,
    /** Bu alanın hatası görünmeli mi? Görünmeliyse mesajı döner. */
    errorFor: (key: K): string | undefined => (tried || touched[key] ? (errors[key] ?? undefined) : undefined),
    touch: (key: K) => setTouched((t) => ({ ...t, [key]: true })),
    /** Hata yoksa onValid çalışır; varsa tüm hatalar görünür olur. */
    submit: (onValid: () => void) => {
      setTried(true);
      if (valid) onValid();
    },
  };
}
