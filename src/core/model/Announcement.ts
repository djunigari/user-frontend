import IAnnouncementInfo from "./AnnouncementInfo";

export default interface IAnnouncement {
	id: string;
	uid?: string;
	name?: string;
	imageUrl?: string;
	url?: string;
	announcementInfo?: IAnnouncementInfo;
	createdAt: Date;
}
