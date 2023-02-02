import { container } from "tsyringe";

import { HttpEaClient } from '@pager/ea-client/lib/httpEaClient'

const getOrgIdFromService = async (orgCode: string) => {
    const httpEaClient = container.resolve(HttpEaClient);

    const { orgId } = await httpEaClient.getOrgIdByOrgCode({ orgCode });

    return orgId;
}

export class OrganizationsService {

    private orgCodeToOrgIdMap: Record<string, string>;

    constructor() {

        this.orgCodeToOrgIdMap = {};
    }

    async getOrgIdForOrgCode(orgCode: string): Promise<string> {


        let orgId = this.orgCodeToOrgIdMap[orgCode];
        if (!orgId) {
            orgId = this.orgCodeToOrgIdMap[orgCode] = await getOrgIdFromService(orgCode);
        }

        return orgId;
    }
}
