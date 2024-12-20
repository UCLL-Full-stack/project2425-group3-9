import { Workspace } from "../model/Workspace";
import database from "../util/database";

const getAllWorkspaces = async (): Promise<Workspace[]> => {
    try {
        const workspacePrisma = await database.workspace.findMany({
            include: {
                profiles: true,
            },
        });
        return workspacePrisma.map((workspace) => Workspace.from(workspace));
    } catch (error) {
        throw new Error('Database error trying to find all workspaces.');
    }
};

const getAllWorkspacesWithprofileId = async (profileId: number): Promise<Workspace[]> => {
    const workspaces = await database.workspace.findMany({
        where: {
          profiles: {
            some: {
              id: profileId,
            },
          },
        },
        include: {
            profiles: true,
        },
      });
      return workspaces.map((workspace) => Workspace.from(workspace));
}

export default{
    getAllWorkspaces,
    getAllWorkspacesWithprofileId,
}
