class Commit {
    sha: string;
    message: string;
    authorName: string;
    authorEmail: string;
    date: Date;
    statsAssigned: boolean;
    additions?: number;
    deletions?: number;
    totalModifications?: number;
}

export default Commit;