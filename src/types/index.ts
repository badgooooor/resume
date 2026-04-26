export interface ISummary {
	value: string;
	hide?: boolean;
}

export interface IProfileResp {
	intro: IIntro;
	summary?: ISummary;
	projects: IProject[];
	technologies: ITechnology[];
	workExperiences: IWorkExperience[];
	educations: IEducation[];
	interests: { value: string; hide?: boolean }[];
	openSourceContributions: IOpenSourceContribution[];
	resumeUrl: {
		sourceLink: string;
		fullVersionLink: string;
	};
}
export interface IIntro {
	name: string;
	nickname: string;
	phone: string;
	email: string;
	github: string;
	linkedin: string;
	location: string;
	website: string;
}

export interface IProject {
	name: string;
	details: string;
	url: string;
	hide?: boolean;
}

export interface ITechnology {
	section: string;
	details: string;
}

export interface IWorkExperience {
	position: string;
	company: string;
	/** One-line context for recruiters (scale, region, domain). */
	companyDescription?: string;
	url: string;
	years: string[];
	details: string[];
	hide?: true;
}

export interface IEducation {
	head: string;
	details: string;
	/** e.g. Latin honors — omit if not applicable */
	honors?: string;
}

export interface IOpenSourceContribution {
	project: string;
	projectUrl: string;
	details: string;
	hide?: boolean;
}
