import IAnnouncement from "@core/model/Announcement";
import useUpdateAnnouncement from "@frontend/lib/apollo-client/hooks/mutations/announcement/useUpdateAnnouncement";
import useGetAnnouncement from "@frontend/lib/apollo-client/hooks/queries/announcement/useGetAnnouncement";
import { useEffect, useState } from "react";

interface useEditAnnouncementProps {
	callbackSuccess?: () => void;
	callbackFail?: () => void;
}

function useEditAnnouncement({
	callbackSuccess,
	callbackFail,
}: useEditAnnouncementProps) {
	const [announcementId, setAnnouncementId] = useState<string>("");
	const [announcement, setAnnouncement] = useState<IAnnouncement>();
	const [name, setName] = useState<string>("");
	const [url, setUrl] = useState<string>("");

	const { fetch, loading: loadingFetch } = useGetAnnouncement({
		callbackSuccess: (value?: IAnnouncement) => {
			setAnnouncement(value);
			setName(value?.name || "");
			setUrl(value?.url || "");
		},
	});

	const { save, loading: loadingUpdate } = useUpdateAnnouncement({
		callbackSuccess: (value?: IAnnouncement) => setAnnouncement(value),
	});

	const update = (token: string) => {
		save(token, announcementId, name, url);
	};

	const reset = () => {
		setName(announcement?.name || "");
		setUrl(announcement?.url || "");
	};

	useEffect(() => {
		if (announcementId) fetch(announcementId);
		else reset();
	}, [announcementId]);

	return {
		setAnnouncementId,
		announcement,
		name,
		url,
		setName,
		setUrl,
		loadingFetch,
		loadingUpdate,
		reset,
		update,
	};
}

export default useEditAnnouncement;
