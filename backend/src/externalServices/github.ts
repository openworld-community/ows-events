import { Octokit } from '@octokit/rest';

const octokit = new Octokit({
	auth: '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'
});

const data = octokit.rest.repos.getContent({
	owner: 'philippranzhin',
	repo: 'peredelanoconf',
	path: 'upcoming-events'
});

data.then((res) => {
	if (!Array.isArray(res.data)) {
		return;
	}
	const filesArray = res.data.map(async (metadata) => {
		const fileData = await octokit.rest.repos.getContent({
			owner: 'philippranzhin',
			repo: 'peredelanoconf',
			path: metadata.path
		});
		return fileData;
	});
	Promise.all(filesArray).then((files) => {
		files.map(async (file) => {
			// @ts-ignore
			const buf = Buffer.from(file.data.content, 'base64');
			const text = buf.toString('utf-8');
			console.log(text);
			const renderedText = await octokit.rest.markdown.render({
				text
			});
			console.log(renderedText.data);
		});
	});
});
