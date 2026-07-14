import { WhatsAppIcon } from '@/components/shared/SocialIcons'
import { siteConfig } from '@/data/siteConfig'

export function WhatsAppButton() {
  return (
    <a
      href={siteConfig.whatsappHref}
      target="_blank"
      rel="noreferrer"
      aria-label="שליחת הודעת וואטסאפ"
      className="fixed bottom-6 start-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_4px_14px_rgba(0,0,0,0.15),0_0_18px_4px_rgba(37,211,102,0.45)] transition-transform duration-300 hover:scale-110"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  )
}
