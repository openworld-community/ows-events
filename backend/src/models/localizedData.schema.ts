import { Schema, SchemaDefinition, SchemaDefinitionProperty, SchemaDefinitionType } from 'mongoose';
import { ILocalizedObject } from '@common/types/localization';
import { SupportedLanguages } from '../../../common/const';

const schemaDefinitionGenerator = () => {
	const langs: SupportedLanguages[] = Object.values(SupportedLanguages);
	const data: SchemaDefinition<SchemaDefinitionType<ILocalizedObject>> = langs.reduce(
		(accum, lang) => {
			const typedAccum: Partial<
				Record<SupportedLanguages, { type: SchemaDefinitionProperty }>
			> = accum;
			typedAccum[lang] = {
				type: String
			};
			return accum;
		},
		{}
	);
	return data;
};

const schemaDefinition = schemaDefinitionGenerator();
export const localizedData = new Schema<ILocalizedObject>(schemaDefinition);
