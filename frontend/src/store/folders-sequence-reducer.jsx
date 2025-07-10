export default function FolderSequenceReducer(state, action) {
    const folder = action.folder;

    if (action.type === 'OPEN_INNER_FOLDER') {
        const updatedFolderSequence = [...state.folderSequence];
        updatedFolderSequence.push(folder);

        return { ...state, folderSequence: updatedFolderSequence };
    }

    if (action.type === 'OPEN_OUTER_FOLDER') {
        let updatedFolderSequence = [...state.folderSequence];

        const index = updatedFolderSequence.indexOf(folder);
        updatedFolderSequence = updatedFolderSequence.slice(0, index + 1);

        return { ...state, folderSequence: updatedFolderSequence };
    }

    if (action.type === 'OPEN_MAIN_FOLDER') {
        let updatedFolderSequence = [folder];

        return { ...state, folderSequence: updatedFolderSequence };
    }

    if (action.type === 'GO_BACK') {
        let updatedFolderSequence = [...state.folderSequence];

        updatedFolderSequence.pop();

        return { ...state, folderSequence: updatedFolderSequence };
    }

    return state;
}