import { g, auth, config } from '@grafbase/sdk'

const User = g.model('user', {
	name: g.string().length({ min: 2, max: 15 }),
	email: g.string().unique(),
	avatarUrl: g.url(),
	githubUrl: g.url().optional(),
	linkedinUrl: g.url().optional(),
	description: g.string().optional(),
	projects: g
		.relation(() => Project)
		.list()
		.optional(),
})

const Project = g.model('Project', {
	title: g.string().length({ min: 2 }),
	description: g.string(),
	image: g.url(),
	githubUrl: g.url(),
	liveSiteUrl: g.url(),
	category: g.string().search(),
	createdBy: g.relation(() => User),
})

export default config({
	schema: g,
	// Integrate Auth
	// https://grafbase.com/docs/auth
	// auth: {
	//   providers: [authProvider],
	//   rules: (rules) => {
	//     rules.private()
	//   }
	// }
})
