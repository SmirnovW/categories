import { Translations } from 'constants/translations';

export function useTranslate() {
	return (key: string) => Translations[key] || '';
}
