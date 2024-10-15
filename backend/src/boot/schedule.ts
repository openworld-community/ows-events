import { parsePeredelano } from '../externalServices/googledocs';
import { getTimestamp, TimestampTypesEnum } from '../utils/get-timestamp';
import { deleteDuplicatesWrapper } from '../externalServices/parser-deletions/deleteDuplicates';
import { deleteExpiredWrapper } from '../externalServices/parser-deletions/deleteExpired';
import { deleteByTitleWrapper } from '../externalServices/parser-deletions/deleteByTitle';

// import { deleteByTitle } from '../externalServices/parser-deletions/deleteByTitle';
// import { deleteDuplicates } from '../externalServices/parser-deletions/deleteDuplicates';
// import { deleteExpired } from '../externalServices/parser-deletions/deleteExpired';
// import { titlesToDeleteList } from '../externalServices/parser-deletions/titlesToDeleteList'; // 'это список который набивается вручную чтоб удалять по выбранному имени, оставляя только один ивент с крайней датой

export const startSchedule = () => {
	// Parse peredelano events once per day
	const peredelanoInterval = getTimestamp({ type: TimestampTypesEnum.DAYS, value: 1 });
	parsePeredelano();
	deleteDuplicatesWrapper().then();
	deleteExpiredWrapper().then();
	deleteByTitleWrapper().then();
	setInterval(parsePeredelano, peredelanoInterval);
	setInterval(deleteDuplicatesWrapper, peredelanoInterval);
	setInterval(deleteExpiredWrapper, peredelanoInterval);
	setInterval(deleteByTitleWrapper, peredelanoInterval);
};
// deleteByTitle(titlesToDeleteList);
// deleteDuplicates();
// deleteExpired();
