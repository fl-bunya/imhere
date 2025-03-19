/** @jsxImportSource hono/jsx */
import { type FC } from 'hono/jsx';

type IpInfoProps = {
  clientIP: string;
  locationInfo: string;
};

export const IpInfo: FC<IpInfoProps> = ({ clientIP, locationInfo }) => {
  return (
    <div class="info-container">
      <h2>あなたのIPアドレス情報</h2>
      <p id="ip-address">IPアドレス: <span>{clientIP}</span></p>
      <p id="location">位置情報: <span>{locationInfo}</span></p>
    </div>
  );
}; 