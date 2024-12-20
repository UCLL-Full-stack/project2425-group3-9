import { Workspace } from "../model/Workspace";
import userDb from "../repository/user.db";
import workspaceDb from '../repository/workspace.db';
import { Role } from "../types";



const getAllWorkspaces = async (username: string, role: Role): Promise<Workspace[]> => {
    if (role === "admin") {
    const workspaces = await workspaceDb.getAllWorkspaces();
    return workspaces;
    }
    if (role === "employee" || role === "caretaker") {
        const user = await userDb.getUserByUsername({username});
        if (!user) {
            throw new Error("User does exist")
        };
        const profile = user.getProfile();
        if (!profile) {
            throw new Error("User does not have a profile")
        };
        const profileId = profile.getId();
        if (profileId === undefined) {
            throw new Error("Profile has no id")
        }
        const workspacesWithId = await workspaceDb.getAllWorkspacesWithprofileId(profileId);
        return workspacesWithId;

    }
    else{
        throw new Error(`couldn't get workspaces, user with username ${username} has no correct role`)
    }
};

export default{
    getAllWorkspaces,
}