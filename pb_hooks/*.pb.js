onRecordAfterAuthWithPasswordRequest((e) => {
	console.log(e.httpContext);
	console.log(e.record);
	console.log(e.identity);
	console.log(e.password);
});
