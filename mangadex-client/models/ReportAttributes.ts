

export type ReportAttributes = {
	details?: string;
	objectId?: string;
	status?: 'waiting' | 'accepted' | 'refused' | 'autoresolved';
	createdAt?: string;
};


