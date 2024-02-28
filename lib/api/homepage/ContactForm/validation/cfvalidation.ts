import z from 'zod';

const parser = z.object({
	name: z.string(),
	email: z.string().email(),
	threeToken: z.string(),
	birthday: z.enum(['1984-06-21'])
}).strict();

const validator = (body: Record<string, unknown>) => {
	try {
		return parser.parse(body);
	} catch {
		return false;
	}
};

export default validator;
