interface SetHeaderProps {
  title: string;
  site_name: string;
  description: string;
  keywords: string;
}

export function setHeaders({ title, site_name, description, keywords }: SetHeaderProps) {
  document.title = 'Tryvoice';
  (document.querySelector('meta[property="og:title"]') as HTMLMetaElement).content = title;
  (document.querySelector('meta[property="og:site_name"]') as HTMLMetaElement).content = site_name;
  (document.querySelector('meta[property="og:description"]') as HTMLMetaElement).content = description;
  (document.querySelector('meta[name="keywords"]') as HTMLMetaElement).content = keywords;
}

