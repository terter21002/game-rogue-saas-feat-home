import { jwtDecode, type JwtPayload } from 'jwt-decode';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { createViewerToken } from '@/actions/token';

export const useViewerToken = (
  hostIdentity: string
): {
  token: string;
  name: string;
  identity: string;
} => {
  const [token, setToken] = useState('');
  const [name, setName] = useState('');
  const [identity, setIdentity] = useState('');

  useEffect(() => {
    const createToken = async (): Promise<void> => {
      try {
        const viewerToken = await createViewerToken(hostIdentity);

        setToken(viewerToken);

        // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
        const decodedToken = jwtDecode(viewerToken) as JwtPayload & {
          name?: string;
        };
        const jwtName = decodedToken.name;
        const jwtId = decodedToken.jti;

        if (jwtId) {
          setIdentity(jwtId);
        }

        if (jwtName) {
          setName(jwtName);
        }
      } catch (error) {
        toast.error('Something Went Wrong!');
      }
    };

    createToken();
  }, [hostIdentity]);
  return { token, name, identity };
};
