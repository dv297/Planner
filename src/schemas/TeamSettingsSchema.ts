import { z } from 'zod';

export const TeamMemberUserSchema = z.object({
  id: z.string(),
  name: z.string(),
  image: z.string(),
  email: z.string(),
});

export const TeamMemberSchema = z.object({
  id: z.string(),
  role: z.string(),
  userId: z.string(),
  teamId: z.string(),
  user: TeamMemberUserSchema,
});

export const TeamMembersListSchema = z.array(TeamMemberSchema);

export const TeamMembersResponseDataSchema = z.object({
  members: TeamMembersListSchema,
});

export const TeamMembersResponseSchema = z.object({
  data: TeamMembersResponseDataSchema,
});

export const InviteTeamMemberInputSchema = z.object({
  email: z.string(),
});

export const AcceptTeamInviteInputSchema = z.object({
  inviteToken: z.string(),
});
